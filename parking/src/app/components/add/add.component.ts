import { Component, OnInit } from "@angular/core";
import { ParkingService } from "../../services/parking.service";
import { ToasterService, Toast } from "angular2-toaster";

@Component({
  selector: "app-add",
  templateUrl: "./add.component.html",
  styleUrls: ["./add.component.css"]
})
export class AddComponent implements OnInit {
  parking = {
    StudentId: "",
    LicenseNumber: "",
    Name: ""
  };
  constructor(
    private parkingService: ParkingService,
    private toasterService: ToasterService
  ) {}

  ngOnInit() {}
  save() {
    this.parkingService.add(this.parking).subscribe(data => {
      console.log(data);
      var toast: Toast = {
        type: "success",
        title: "Success",
        body: "Added Successfully.",
        showCloseButton: true
      };
      this.toasterService.pop(toast);
      this.parking = {
        StudentId: "",
        LicenseNumber: "",
        Name: ""
      };
    });
  }
}
