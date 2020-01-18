import {
  Component,
  OnInit,
  Input,
  EventEmitter,
  Output,
  ViewChild
} from "@angular/core";
import {
  RowSelectEventArgs,
  DataStateChangeEventArgs,
  TextWrapSettingsModel,
  GroupSettingsModel,
  GridComponent,
  EditSettingsModel,
  CommandModel,
  FilterSettingsModel,
  Column,
  IRow,
  ActionEventArgs
} from "@syncfusion/ej2-angular-grids";
import { ClickEventArgs } from "@syncfusion/ej2-navigations";
import { FilterEventModel } from "../interfaces/filter-event.model";

import { CustomGridColumns } from "../interfaces/custom-grid-columns";
import { QueryString } from "../interfaces/query-string.model";
import { Subject } from "rxjs";
import { ActivatedRoute, Router } from "@angular/router";
import { closest } from "@syncfusion/ej2-base";

@Component({
  selector: "app-container",
  templateUrl: "./container.component.html",
  styleUrls: ["./container.component.css"]
})
export class ContainerComponent implements OnInit {
  @Input()
  public columnsList: CustomGridColumns[];
  @Input()
  public data: Subject<DataStateChangeEventArgs>;
  @Input()
  public showUpdate: boolean;
  @Input()
  public showDelete: boolean;
  @Input()
  public showView: boolean;
  @Input()
  public showAdd = true;
  @Input()
  public showPrint: boolean;
  @Input()
  public showPdfExport: boolean;
  @Input()
  public showExcelExport: boolean;
  @Input()
  public showColumnChooser: boolean;

  @Input()
  public idKey: any;
  @Input()
  public pageSize = 50;

  @Input()
  public pageNumber = 1;

  @Input()
  public totalPages = 1;

  @Input()
  public deleteRoute = "";
  @Input()
  public editRoute: string;
  @Input()
  public addRoute = "";
  @Input()
  public allowGrouping: boolean;
  @Input()
  public wrapSettings: TextWrapSettingsModel;

  @Input()
  public updatePrivilage: string;
  @Input()
  public addPrivilage: string;
  @Input()
  public deletePrivilage: string;

  @Input()
  public customAttributes: { class: string };

  @Output()
  public dataQueried: EventEmitter<string> = new EventEmitter();
  @Output()
  public rowSelected: EventEmitter<any> = new EventEmitter();
  @Output()
  public deleteRecord: EventEmitter<any> = new EventEmitter();
  @Output()
  public editRecord: EventEmitter<any> = new EventEmitter();

  @Input()
  public groupByOptions: GroupSettingsModel = {};

  @Output()
  public dataStateChaged: EventEmitter<
    DataStateChangeEventArgs
  > = new EventEmitter();

  @ViewChild("grid", { static: false })
  public grid: GridComponent;

  public pageSizes: string[] = ["50", "100", "150", "200"];
  public initialPage: { pageSize: number; pageSizes: string[] };
  public filterSettings: FilterSettingsModel;
  public toolbar: object[] = [];
  public selectOptions: object;
  public commands: CommandModel[] = [];
  public editSettings: EditSettingsModel;
  private query: QueryString;
  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
    this.initialPage = {
      pageSize: 50,
      pageSizes: this.pageSizes
    };
    this.query = new QueryString();
  }

  ngOnInit() {
    this.customAttributes = { class: "custom-grid-header" };

    this.filterSettings = { type: "Menu" };
    this.selectOptions = { type: "Multiple", persistSelection: true };
    this.editSettings = {
      allowDeleting: true,
      allowAdding: true
    };

    this.initilizeCommandColumn();
    this.initializeToolBar();
  }
  initilizeCommandColumn(): void {
    if (this.showUpdate) {
      this.commands.push({
        buttonOption: {
          iconCss: "e-icons e-edit",
          cssClass: "e-flat",
          click: this.editAction.bind(this)
        }
      });
    }

    if (this.showDelete) {
      this.commands.push({
        buttonOption: {
          iconCss: "e-icons e-delete",
          cssClass: "e-flat",
          click: this.deleteAction.bind(this)
        }
      });
    }
  }

  deleteAction(event: Event) {
    const rowObj: IRow<Column> = this.grid.getRowObjectFromUID(
      closest(event.target as Element, ".e-row").getAttribute("data-uid")
    );
    if (confirm("Are you sure to delete")) {
      this.deleteRecord.emit(rowObj.data);
    } else {
      return null;
    }
  }

  private editAction(event: Event): void {
    const rowObj: IRow<Column> = this.grid.getRowObjectFromUID(
      closest(event.target as Element, ".e-row").getAttribute("data-uid")
    );
    const key = this.idKey ? this.idKey : "Id";

    if (this.editRoute) {
      this.router.navigate([`/${this.editRoute}/${rowObj.data[key]}/update`]);
    } else {
      this.router.navigate([`${rowObj.data[key]}/update`], {
        relativeTo: this.activatedRoute
      });
    }

    //  this.editRecord.emit(rowObj.data);
  }

  onDataStateChanged(state: DataStateChangeEventArgs) {
    this.dataStateChaged.emit(state);
  }

  actionEndHandler(args: ActionEventArgs) {
    switch (args.requestType) {
      case "sorting":
        this.query.sortDirection = args["direction"];
        this.query.sortBy = args["columnName"];

        break;
      case "filtering":
        const filteringModel = new FilterEventModel();
        filteringModel.columnName = args["currentFilterObject"]["field"];
        filteringModel.operator = args["currentFilterObject"]["operator"];
        filteringModel.value = args["currentFilterObject"]["value"];

        break;
      case "searching":
        this.query.searchString = args["searchString"];

        break;
      case "paging":
        this.query.searchString = args["searchString"];

        break;
    }

    if (args.requestType !== "refresh") {
      this.dataQueried.emit(this.prepareQuery());
    }

    if (
      this.query.pageSize !== this.grid.pageSettings.pageSize ||
      this.query.pageNumber !== this.grid.pageSettings.currentPage
    ) {
      this.query.pageSize = this.grid.pageSettings.pageSize;
      this.query.pageNumber = this.grid.pageSettings.currentPage;

      this.dataQueried.emit(this.prepareQuery());
    }
  }

  private prepareQuery(): string {
    let searchString = `selectedColumns=${this.query.selectedColumns.toString()}&`;

    if (this.query.searchString) {
      searchString += `searchString=${this.query.searchString}&`;
    }

    if (this.query.sortBy) {
      searchString += `sortBy=${this.query.sortBy}&sortDirection=${
        this.query.sortDirection
      }&`;
    }

    searchString += `pageSize=${this.query.pageSize}&pageNumber=${
      this.query.pageNumber
    }`;

    return searchString;
  }

  initializeToolBar(): void {
    if (this.showAdd) {
      this.toolbar.push({
        text: "Add",
        prefixIcon: "e-create",
        id: "add"
      });
    }
    if (this.showPdfExport) {
      this.toolbar.push({
        text: "PdfExport",
        prefixIcon: "e-Pdf_Export",
        id: "pdfExport"
      });
    }
    if (this.showExcelExport) {
      this.toolbar.push({
        text: "ExcelExport",
        prefixIcon: "e-Excel_Export",
        id: "excelExport"
      });
    }
    if (this.showPrint) {
      this.toolbar.push({
        text: "Print",
        prefixIcon: "e-print",
        id: "print"
      });
    }
  }

  toolbarClick(args: ClickEventArgs): void {
    switch (args.item.id) {
      case "create":
        if (this.addRoute.trim().length === 0) {
          this.router.navigate(["add"], { relativeTo: this.activatedRoute });
        } else {
          this.router.navigate([this.addRoute]);
        }
        break;
      case "pdfExport":
        this.grid.pdfExport();
        break;
      case "excelExport":
        this.grid.excelExport();
        break;
      case "print":
        window.print();
        break;
    }
  }

  rowIsSelected(event: RowSelectEventArgs): void {
    this.rowSelected.emit(event);
  }
}
