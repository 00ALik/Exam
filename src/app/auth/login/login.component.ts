import { Component, OnInit, input } from "@angular/core";

import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { AuthService } from "../services/auth.service";
import { validateBasis } from "@angular/flex-layout";
import { Router, RouterModule } from "@angular/router";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-login",
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, RouterModule],
  templateUrl: "./login.component.html",
  styleUrl: "./login.component.scss",
})
export class LoginComponent implements OnInit {
  formlogin!: FormGroup;
  user: any[] = [];
  type: string = "students";

  constructor(
    private api: AuthService,
    private fb: FormBuilder,
    private rout: Router,
    private tost: ToastrService
  ) {}

  ngOnInit(): void {
    this.loginform();
    this.getAnyUser();
  }

  loginform() {
    this.formlogin = this.fb.group({
      type: [this.type],
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required]],
    });
  }

  Role(event: any) {
    this.type = event.target.value;
    this.getAnyUser();
  }

  getAnyUser() {
    this.api.getUser(this.type).subscribe((res: any) => {
      this.user = res;
    });
  }

  onlogin() {
    let index = this.user.findIndex(
      (item) =>
        item.email == this.formlogin.value.email &&
        item.password == this.formlogin.value.password
    );
    if (index == -1) {
      this.tost.error(" البريد الالكتروني او كلمة السر غير صحيحه ");
    } else {
      const model = {
        username: this.user[index].username,
        role: this.type,
        userId: this.user[index].id,
      };
      this.api.loginService(model).subscribe((res) => {
        this.api.user.next(res);
        this.tost.success("تم الدخول بنجاح   ");
        this.rout.navigate(["./subject"]);
        console.log(res);
      });
    }
  }
}
