export interface CustomGridColumns {
  header: string;
  key: string;
  width?: number;
  format?: string;
  visible?: boolean;
  type: string;
  textAlign?: string;
  hederAlign?: string;
}

export class GroupingEventModel {
  columnName: string;
  name: string;
  columns: string[];
}

export class SortingEventModel {
  columnName: string;
  direction: string;
  columns: string[];
}

export class FilterEventModel {
  columnName?: string;
  propertyName?: string;
  operator?: string;
  value: string | number | boolean | Date;
  operation?: string;
  columns?: string;
}

export class QueryString {
  year?: string;
  selectedColumns = "";
  sortDirection = "Asc";
  sortBy = "";
  searchString = "";
  pageNumber = 0;
  pageSize = 10;
  filter: FilterEventModel[] = [];
}
