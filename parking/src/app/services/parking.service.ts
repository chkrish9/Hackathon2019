import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class ParkingService {
  constructor(private http: HttpClient) {}
  add(parking) {
    let headers = new HttpHeaders({
      "Content-Type": "application/json"
    });
    let url = this.prepEndpoint("create");
    return this.http.post(url, parking, { headers: headers });
  }
  delete(studentId) {
    let headers = new HttpHeaders({
      "Content-Type": "application/json"
    });
    let url = this.prepEndpoint("delete/");
    return this.http.delete(url + studentId, { headers: headers });
  }

  get() {
    let headers = new HttpHeaders({
      "Content-Type": "application/json"
    });
    let url = this.prepEndpoint("getall/");
    return this.http.get(url, { headers: headers });
  }

  getFilter(searchTerm) {
    let headers = new HttpHeaders({
      "Content-Type": "application/json"
    });
    let url = this.prepEndpoint("search?licenseNumber=");
    return this.http.get(url + searchTerm, { headers: headers });
  }
  prepEndpoint(ep) {
    return "https://hackthon19.herokuapp.com/" + ep;
  }
}
