import { Component, OnInit } from "@angular/core";
import { sharedModule } from "../../../../shared/shared.module";
import { CommonModule } from "@angular/common";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { ToastrService } from "ngx-toastr";
import { ServicesService } from "../doctor/services.service";

@Component({
  selector: "app-newexam",
  standalone: true,
  imports: [sharedModule, CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: "./newExam.component.html",
  styleUrl: "./newExam.component.scss",
})
export class newExamComponent implements OnInit {
  name = new FormControl("");
  questionForm!: FormGroup;
  questions: any[] = [];
  correctNm: any;
  startAdd: boolean = false;
  preview: boolean = false;
  subjectName: any = "";
  steperrIndex = 0;
  id: any;

  constructor(
    private fb: FormBuilder,
    private tost: ToastrService,
    private api: ServicesService
  ) {}

  ngOnInit(): void {
    this.createFormQuestion();
  }

  createFormQuestion() {
    this.questionForm = this.fb.group({
      question: ["", [Validators.required]],
      anser1: ["", [Validators.required]],
      anser2: ["", [Validators.required]],
      anser3: ["", [Validators.required]],
      anser4: ["", [Validators.required]],
    });
  }

  getAnser(event: any) {
    this.correctNm = event.value;
  }

  start() {
    if (this.name.value == "") {
      this.tost.error("يرجى ادخال اسم الماده ");
    } else {
      this.subjectName = this.name.value;
      this.startAdd = true;
    }
    if (this.startAdd) {
      this.steperrIndex = 1;
    }
  }

  creatSvaeQuestion() {
    if (this.correctNm) {
      const model = {
        question: this.questionForm.value.question,
        anser1: this.questionForm.value.anser1,
        anser2: this.questionForm.value.anser2,
        anser3: this.questionForm.value.anser3,
        anser4: this.questionForm.value.anser4,
        correctAnser: this.questionForm.value[this.correctNm],
      };
      this.questions.push(model);
      this.questionForm.reset();
    } else {
      this.tost.error("يرحى اختيار الاجابه ");
    }
    console.log(this.questions);
  }

  deletQuestion() {
    this.questionForm.reset();
  }

  cancel() {
    this.questionForm.reset();
    this.questions = [];
    this.subjectName = "";
    this.name.reset();
    this.startAdd = false;
    this.steperrIndex = 0;
  }

  onSave() {
    const model = {
      name: this.subjectName,
      questions: this.questions,
    };

    if (this.preview) {
      this.steperrIndex = 2;
    } else {
      this.api.createSubjects(model).subscribe((res: any) => {
        this.id = res.id;
        this.preview = true;
      });
    }
    console.log(model);
  }

  deleteQuestion(index: any) {
    this.questions.splice(index, 1);
    const model = {
      name: this.subjectName,
      questions: this.questions,
    };
    this.api.updateSUBJECT(model, this.id).subscribe((res: any) => {
      this.tost.success("تم حذف السؤال بنجاح ");
    });
  }
}
