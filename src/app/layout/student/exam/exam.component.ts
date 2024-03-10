import { Component, OnInit } from "@angular/core";
import { sharedModule } from "../../../../shared/shared.module";
import { CommonModule } from "@angular/common";
import { ActivatedRoute } from "@angular/router";
import { ServicesService } from "../../DOctor/doctor/services.service";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { AuthService } from "../../../auth/services/auth.service";

@Component({
  selector: "app-exam",
  standalone: true,
  imports: [sharedModule, CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: "./exam.component.html",
  styleUrl: "./exam.component.scss",
})
export class ExamComponent implements OnInit {
  id: any;
  allSubjectId: any;
  User: any;
  totalAnser: number = 0;
  showResult: boolean = false;
  hiddenRadioButton: boolean = true;
  studentInfo: any;
  subjectStudent: any[] = [];
  valiExam: boolean = true;
  constructor(
    private rout: ActivatedRoute,
    private api: ServicesService,
    private tost: ToastrService,
    private auth: AuthService
  ) {
    this.id = this.rout.snapshot.paramMap.get("id");
    this.getAllSUbjectbyId();
    this.getRoleUser();
  }
  ngOnInit(): void {}

  getAllSUbjectbyId() {
    this.api.getAllsubjectId(this.id).subscribe((res: any) => {
      this.allSubjectId = res;
    });
  }

  getResualt(event: any) {
    let value = event.value,
      questionIndex = event.source.name;

    this.allSubjectId.questions[questionIndex].studentAnser = value;
  }

  deleteQuestion(index: any) {
    this.allSubjectId.questions.splice(index, 1);
    const model = {
      name: this.allSubjectId.name,
      questions: this.allSubjectId.questions,
    };
    this.api.updateSUBJECT(model, this.id).subscribe((res: any) => {
      this.tost.success("تم حذف السؤال بنجاح ");
    });
  }

  getRoleUser() {
    this.auth.getRole().subscribe((res: any) => {
      this.User = res;
      this.getUserALLstudent();
    });
  }

  getUserALLstudent() {
    this.api.getAlluserStudent(this.User.userId).subscribe((res: any) => {
      this.studentInfo = res;
      this.subjectStudent = res?.subjects ? res?.subjects : [];
      this.checkvalidExam();
    });
  }

  checkvalidExam() {
    for (let x in this.subjectStudent) {
      if (this.subjectStudent[x].id == this.id) {
        this.totalAnser = this.subjectStudent[x].degree;
        this.valiExam = false;
        this.tost.warning("لقد انجزت هذا الاختبار مسبقا");
      }
    }
    console.log(this.valiExam);
  }

  getResulat() {
    this.totalAnser = 0;
    for (let x in this.allSubjectId.questions) {
      if (
        this.allSubjectId.questions[x].studentAnser ==
        this.allSubjectId.questions[x].correctAnser
      ) {
        this.totalAnser++;
      }
      console.log(this.totalAnser);
    }
    this.showResult = true;

    this.subjectStudent.push({
      name: this.allSubjectId.name,
      id: this.id,
      degree: this.totalAnser,
    });
    const model = {
      username: this.studentInfo.username,
      email: this.studentInfo.email,
      password: this.studentInfo.password,
      subjects: this.subjectStudent,
    };

    this.api
      .updateuserStudent(this.User.userId, model)
      .subscribe((res: any) => {
        this.tost.success("تم تسجيل الامتحان بنجاح ");
      });
  }
}
