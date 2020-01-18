export class FilterEventModel {
  columnName?: string;
  propertyName?: string;
  operator?: string;
  value: string | number | boolean | Date;
  operation?: string;
  columns?: string;
}