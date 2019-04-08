import { Component, OnInit } from "@angular/core";
import { ParkingService } from "../../services/parking.service";
import { ToasterService, Toast } from "angular2-toaster";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"]
})
export class HomeComponent implements OnInit {
  pmsList: any;
  value: String;
  constructor(
    private parkingService: ParkingService,
    private toasterService: ToasterService
  ) {
    this.get();
  }

  ngOnInit() {}
  delete(studentId) {
    this.parkingService.delete(studentId).subscribe(data => {
      var toast: Toast = {
        type: "success",
        title: "Success",
        body: "Deleted Successfully.",
        showCloseButton: true
      };
      this.toasterService.pop(toast);
      this.get();
    });
  }
  get() {
    this.parkingService.get().subscribe(data => {
      this.pmsList = data;
    });
  }

  onSearchChange() {
    if (this.value.length > 0) {
      this.parkingService.getFilter(this.value).subscribe(data => {
        this.pmsList = data;
      });
    } else {
      this.get();
    }
  }
}
