import { Category, SystemCode, GradingSystem, GradeRow } from './types';

export const SYSTEMS: GradingSystem[] = [
  { name: 'French', code: SystemCode.FRENCH, category: Category.ROUTE, description: 'European sport/lead climbing grades' },
  { name: 'YDS (Yosemite Decimal System)', code: SystemCode.YDS, category: Category.ROUTE, description: 'North American sport/trad climbing grades' },
  { name: 'UIAA', code: SystemCode.UIAA, category: Category.ROUTE, description: 'Central & Eastern Europe sport/trad grades' },
  { name: 'V-Scale (Hueco)', code: SystemCode.V_SCALE, category: Category.BOULDER, description: 'North American bouldering grades' },
  { name: 'Fontainebleau (Font)', code: SystemCode.FONT, category: Category.BOULDER, description: 'European bouldering grades' }
];

export const ROUTE_GRADES: GradeRow[] = [
  { FRENCH: '3', YDS: '5.4', UIAA: 'III' },
  { FRENCH: '4a', YDS: '5.5', UIAA: 'IV' },
  { FRENCH: '4b', YDS: '5.6', UIAA: 'IV+' },
  { FRENCH: '4c', YDS: '5.7', UIAA: 'V' },
  { FRENCH: '5a', YDS: '5.8', UIAA: 'V+' },
  { FRENCH: '5b', YDS: '5.9', UIAA: 'VI-' },
  { FRENCH: '5c', YDS: '5.10a', UIAA: 'VI' },
  { FRENCH: '6a', YDS: '5.10b', UIAA: 'VI+' },
  { FRENCH: '6a+', YDS: '5.10c', UIAA: 'VII-' },
  { FRENCH: '6b', YDS: '5.10d', UIAA: 'VII' },
  { FRENCH: '6b+', YDS: '5.11a', UIAA: 'VII+' },
  { FRENCH: '6c', YDS: '5.11b', UIAA: 'VII+/VIII-' },
  { FRENCH: '6c+', YDS: '5.11c', UIAA: 'VIII-' },
  { FRENCH: '7a', YDS: '5.11d', UIAA: 'VIII' },
  { FRENCH: '7a+', YDS: '5.12a', UIAA: 'VIII+' },
  { FRENCH: '7b', YDS: '5.12b', UIAA: 'VIII+/IX-' },
  { FRENCH: '7b+', YDS: '5.12c', UIAA: 'IX-' },
  { FRENCH: '7c', YDS: '5.12d', UIAA: 'IX' },
  { FRENCH: '7c+', YDS: '5.13a', UIAA: 'IX+' },
  { FRENCH: '8a', YDS: '5.13b', UIAA: 'IX+/X-' },
  { FRENCH: '8a+', YDS: '5.13c', UIAA: 'X-' },
  { FRENCH: '8b', YDS: '5.13d', UIAA: 'X' },
  { FRENCH: '8b+', YDS: '5.14a', UIAA: 'X+' },
  { FRENCH: '8c', YDS: '5.14b', UIAA: 'X+/XI-' },
  { FRENCH: '8c+', YDS: '5.14c', UIAA: 'XI-' },
  { FRENCH: '9a', YDS: '5.14d', UIAA: 'XI' },
  { FRENCH: '9a+', YDS: '5.15a', UIAA: 'XI+' },
  { FRENCH: '9b', YDS: '5.15b', UIAA: 'XI+/XII-' },
  { FRENCH: '9b+', YDS: '5.15c', UIAA: 'XII-' },
  { FRENCH: '9c', YDS: '5.15d', UIAA: 'XII' }
];

export const BOULDER_GRADES: GradeRow[] = [
  { V_SCALE: 'VB', FONT: '3' },
  { V_SCALE: 'V0', FONT: '4' },
  { V_SCALE: 'V1', FONT: '5' },
  { V_SCALE: 'V2', FONT: '5+' },
  { V_SCALE: 'V3', FONT: '6A' },
  { V_SCALE: 'V4', FONT: '6B' },
  { V_SCALE: 'V5', FONT: '6C' },
  { V_SCALE: 'V6', FONT: '7A' },
  { V_SCALE: 'V7', FONT: '7A+' },
  { V_SCALE: 'V8', FONT: '7B+' },
  { V_SCALE: 'V9', FONT: '7C' },
  { V_SCALE: 'V10', FONT: '7C+' },
  { V_SCALE: 'V11', FONT: '8A' },
  { V_SCALE: 'V12', FONT: '8A+' },
  { V_SCALE: 'V13', FONT: '8B' },
  { V_SCALE: 'V14', FONT: '8B+' },
  { V_SCALE: 'V15', FONT: '8C' },
  { V_SCALE: 'V16', FONT: '8C+' },
  { V_SCALE: 'V17', FONT: '9A' }
];
