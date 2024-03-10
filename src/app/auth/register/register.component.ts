import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { AuthService } from "../services/auth.service";
import { Router, RouterModule } from "@angular/router";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-register",
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule, RouterModule],
  templateUrl: "./register.component.html",
  styleUrl: "./register.component.scss",
})
export class RegisterComponent implements OnInit {
  formlogin!: FormGroup;
  students: any[] = [];

  constructor(
    private fb: FormBuilder,
    private api: AuthService,
    private rout: Router,
    private tost: ToastrService
  ) {}

  ngOnInit(): void {
    this.createForm();
    this.getStudent();
  }

  createForm() {
    this.formlogin = this.fb.group(
      {
        username: ["", [Validators.required]],
        email: ["", [Validators.required, Validators.email]],
        password: ["", [Validators.required]],
        confirmpassword: ["", [Validators.required]],
      },
      { validators: this.passwordMatchValidator }
    );
  }

  passwordMatchValidator(form: FormGroup) {
    return form.get("password")?.value === form.get("confirmpassword")?.value
      ? null
      : { mismatch: true };
  }

  //جلب جميع الايميلات الموجوده في قاعدة البيانات
  getStudent() {
    this.api.getUser("students").subscribe((res: any) => {
      this.students = res;
    });
  }

  onRegister() {
    if (this.formlogin.hasError("mismatch")) {
      this.formlogin.get("confirmpassword")?.setErrors({ mismatch: true });
      this.tost.error("كلمة المرور غير مطابقة");
      return;
    }

    const model = {
      username: this.formlogin.value.username,
      email: this.formlogin.value.email,
      password: this.formlogin.value.password,
    };

    let index = this.students.findIndex(
      (item) => item.email == this.formlogin.value.email
    );
    if (index !== -1) {
      this.tost.error("البريد الالكتروني موجود مسبقا ");
    } else {
      this.api.register(this.formlogin.value).subscribe((res: any) => {
        this.tost.success("تم انشاء الحساب بنجاح ");
        const model = {
          username: res.username,
          role: "students",
          userId: res.id,
        };
        this.api.loginService(model).subscribe((res) => {
          this.api.user.next(res);

          console.log(res);
        });
        this.rout.navigate(["./subject"]);
        console.log(res);
      });
    }
  }
}
