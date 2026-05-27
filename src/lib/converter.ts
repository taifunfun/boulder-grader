import { Category, SystemCode, GradingSystem, GradeRow } from './types';
import { SYSTEMS, ROUTE_GRADES, BOULDER_GRADES } from './grades';

export class GradeConversionError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'GradeConversionError';
  }
}

export class GradeConverter {
  private systems: Record<string, GradingSystem>;

  constructor() {
    this.systems = SYSTEMS.reduce((acc, sys) => {
      acc[sys.code] = sys;
      return acc;
    }, {} as Record<string, GradingSystem>);
  }

  listSystems(): GradingSystem[] {
    return SYSTEMS;
  }

  private getSystem(systemCode: string): GradingSystem {
    const code = systemCode.toUpperCase();
    const sys = this.systems[code];
    if (!sys) {
      throw new GradeConversionError(`Unknown or unsupported system: ${systemCode}`);
    }
    return sys;
  }

  getFullGradeTable(systemCode: string): GradeRow[] {
    const sys = this.getSystem(systemCode);
    return sys.category === Category.ROUTE ? ROUTE_GRADES : BOULDER_GRADES;
  }

  convert(value: string, fromSystem: string, toSystem: string): string {
    const fromSys = this.getSystem(fromSystem);
    const toSys = this.getSystem(toSystem);

    if (fromSys.category !== toSys.category) {
      throw new GradeConversionError(`Cannot convert between ${fromSys.category} and ${toSys.category} grades.`);
    }

    const table = fromSys.category === Category.ROUTE ? ROUTE_GRADES : BOULDER_GRADES;
    const valueLower = value.toLowerCase();

    for (const row of table) {
      const fromVal = row[fromSys.code];
      if (fromVal && fromVal.toLowerCase() === valueLower) {
        return row[toSys.code] || '';
      }
    }

    // Partial match bonus (e.g., "5.10")
    if (fromSys.code === SystemCode.YDS && valueLower.startsWith('5.') && !/[a-z]$/i.test(value)) {
      const matches: string[] = [];
      for (const row of table) {
        const fromVal = row[fromSys.code];
        if (fromVal && fromVal.toLowerCase().startsWith(valueLower) && fromVal.toLowerCase() !== valueLower) {
          const toVal = row[toSys.code];
          if (toVal && !matches.includes(toVal)) {
            matches.push(toVal);
          }
        }
      }
      if (matches.length > 0) {
        return matches.join(', ');
      }
    }

    throw new GradeConversionError(`Invalid or unrecognized grade: '${value}' in system '${fromSys.code}'`);
  }

  convertToAll(value: string, fromSystem: string): Record<string, string> {
    const fromSys = this.getSystem(fromSystem);
    const table = fromSys.category === Category.ROUTE ? ROUTE_GRADES : BOULDER_GRADES;
    const valueLower = value.toLowerCase();

    for (const row of table) {
      const fromVal = row[fromSys.code];
      if (fromVal && fromVal.toLowerCase() === valueLower) {
        const result: Record<string, string> = {};
        for (const key of Object.keys(row)) {
          if (key !== fromSys.code) {
            result[key] = row[key as SystemCode] as string;
          }
        }
        return result;
      }
    }

    throw new GradeConversionError(`Invalid or unrecognized grade: '${value}' in system '${fromSys.code}'`);
  }
}
