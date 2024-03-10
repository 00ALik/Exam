import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../../../environments/environment.development";

@Injectable({
  providedIn: "root",
})
export class ServicesService {
  Url: string = environment.api;
  constructor(private http: HttpClient) {}

  createSubjects(data: any) {
    return this.http.post(this.Url + "subjects", data);
  }

  updateSUBJECT(model: any, id: number) {
    return this.http.put(this.Url + "subjects/" + id, model);
  }

  getAllsubject() {
    return this.http.get(this.Url + "subjects");
  }

  getAllsubjectId(id: number) {
    return this.http.get(this.Url + "subjects/" + id);
  }

  getAlluserStudent(id: number) {
    return this.http.get(this.Url + "students/" + id);
  }

  updateuserStudent(id: number, model: any) {
    return this.http.put(this.Url + "students/" + id, model);
  }

  deleteItemSubject(id: number) {
    return this.http.delete(this.Url + "subjects/" + id);
  }
}
