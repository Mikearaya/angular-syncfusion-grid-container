import { Component, OnInit } from "@angular/core";
import { CustomGridColumns } from "../interfaces/custom-grid-columns";

@Component({
  selector: "app-view",
  templateUrl: "./view.component.html",
  styleUrls: ["./view.component.css"]
})
export class ViewComponent implements OnInit {
  data = [
    {
      id: 1,
      name: "mikael araya",
      phoneNumber: "0912778877",
      emailAddress: "mikaelarata12@gmail.com"
    },
    {
      id: 2,
      name: "Abebe Kumsa",
      phoneNumber: "0912778877",
      emailAddress: "mikaelarata12@gmail.com"
    }
  ];

  columnDefinition: CustomGridColumns[] = [
    {
      header: "Id",
      type: "number",
      visible: true,
      key: "id",
      width: 40
    },
    {
      header: "Name",
      type: "string",
      visible: true,
      key: "name",
      width: 150
    },
    {
      header: "E-Mail",
      type: "string",
      visible: true,
      key: "emailAddress",
      width: 75
    },
    {
      header: "Phonenumber",
      type: "string",
      visible: true,
      key: "phoneNumber",
      width: 75
    }
  ];

  constructor() {}

  ngOnInit() {}

  dataQueried($event: any) {
    console.log($event);
  }
}
