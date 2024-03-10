import { Component, OnInit } from "@angular/core";
import { ServicesService } from "../doctor/services.service";
import { RouterModule, RouterOutlet } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { AuthService } from "../../../auth/services/auth.service";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-subject",
  standalone: true,
  imports: [RouterModule, FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: "./subject.component.html",
  styleUrl: "./subject.component.scss",
})
export class SubjectComponent implements OnInit {
  infoUser: any[] = [];
  ALLuser: any;

  constructor(
    private api: ServicesService,
    private api2: AuthService,
    private tost: ToastrService
  ) {}

  ngOnInit(): void {
    this.getAllinfo();
    this.getAllUser();
  }

  getAllinfo() {
    this.api.getAllsubject().subscribe((res: any) => {
      this.infoUser = res;
    });
  }

  getAllUser() {
    this.api2.getRole().subscribe((res: any) => {
      this.ALLuser = res;
    });
  }

  delete(index: number) {
    let id = this.infoUser[index].id;
    this.infoUser.splice(index, 1);
    this.api.deleteItemSubject(id).subscribe((res: any) => {
      this.tost.success("تم الحذف بنجاح");
    });
  }
}
