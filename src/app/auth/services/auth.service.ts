import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment.development";
import { Subject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  user = new Subject();
  isLoggedIn: boolean = false;
  Url: string = environment.api;
  constructor(private http: HttpClient) {}

  register(data: any) {
    return this.http.post(this.Url + "students", data);
  }

  getUser(type: string) {
    return this.http.get(this.Url + type);
  }

  loginService(data: any) {
    return this.http.put(this.Url + "login/1", data);
  }

  getRole() {
    return this.http.get(this.Url + "login/1");
  }
}
