import { FilterEventModel } from "./filter-event.model";

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
