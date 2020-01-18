import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { ContainerComponent } from "./container/container.component";
import { GridModule } from "@syncfusion/ej2-angular-grids";
import {
  SortService,
  FilterService,
  GroupService,
  EditService,
  ExcelExportService,
  ColumnChooserService,
  ColumnMenuService,
  SearchService,
  PdfExportService,
  ReorderService,
  CommandColumnService,
  ToolbarService,
  ResizeService,
  PageService,
  ContextMenuService
} from "@syncfusion/ej2-angular-grids";
import { ViewComponent } from "./view/view.component";

@NgModule({
  declarations: [AppComponent, ContainerComponent, ViewComponent],
  imports: [BrowserModule, GridModule, AppRoutingModule],
  providers: [
    SortService,
    FilterService,
    GroupService,
    EditService,
    ExcelExportService,
    ColumnChooserService,
    ColumnMenuService,
    SearchService,
    PdfExportService,
    ReorderService,
    CommandColumnService,
    ToolbarService,
    ResizeService,
    PageService,
    ContextMenuService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
