import { Component, OnInit } from "@angular/core";
import { ParkingService } from "../../services/parking.service";

@Component({
  selector: "app-add",
  templateUrl: "./add.component.html",
  styleUrls: ["./add.component.css"]
})
export class AddComponent implements OnInit {
  parking = {
  "StudentId":"",
  "LicenseNumber":"",
  "Name":""
  };
  constructor(private parkingService:ParkingService) {}

  ngOnInit() {}
  save() {
    this.parkingService.add(this.parking).subscribe(data => {
      console.log(data);
      this.parking = {
        "StudentId":"",
        "LicenseNumber":"",
        "Name":""
      };
    });
  }
}
