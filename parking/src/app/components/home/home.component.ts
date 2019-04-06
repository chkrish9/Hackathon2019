import { Component, OnInit } from "@angular/core";
import { ParkingService } from "../../services/parking.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"]
})
export class HomeComponent implements OnInit {
  pmsList: any ;
  constructor(private parkingService: ParkingService) {
    this.get();
  }

  ngOnInit() {}
  delete(studentId) {
    this.parkingService.delete(studentId).subscribe(data => {
      this.get();
    });
  }
  get() {
    this.parkingService.get().subscribe(data => {
      this.pmsList = data;
    });
  }
}
