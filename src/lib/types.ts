export enum Category {
  ROUTE = 'route',
  BOULDER = 'boulder'
}

export enum SystemCode {
  FRENCH = 'FRENCH',
  YDS = 'YDS',
  UIAA = 'UIAA',
  V_SCALE = 'V_SCALE',
  FONT = 'FONT'
}

export interface GradingSystem {
  name: string;
  code: SystemCode;
  category: Category;
  description: string;
}

export type GradeRow = Partial<Record<SystemCode, string>>;
