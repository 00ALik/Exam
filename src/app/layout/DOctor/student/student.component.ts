import { Component, OnInit } from "@angular/core";
import { sharedModule } from "../../../../shared/shared.module";
import { AuthService } from "../../../auth/services/auth.service";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-student",
  standalone: true,
  imports: [sharedModule, CommonModule],
  templateUrl: "./student.component.html",
  styleUrl: "./student.component.scss",
})
export class StudentComponent implements OnInit {
  displayedColumns: any;
  dataSource: any;
  dataTable: any;
  constructor(private api: AuthService) {
    this.displayedColumns = ["position", "name", "subjectname", "degree"];
  }
  ngOnInit(): void {
    this.getstudents();
  }

  getstudents() {
    this.api.getUser("students").subscribe((res: any) => {
      this.dataSource = res?.map((student: any) => {
        if (student.subjects) {
          return student?.subjects?.map((sub: any) => {
            return {
              name: student.username,
              subjectName: sub.name,
              degree: sub.degree,
            };
          });
        } else {
          return {
            name: student.username,
            subjectName: "--",
            degree: "--",
          };
        }
      });
      console.log(this.dataSource);
      this.dataTable = [];

      if (this.dataSource && this.dataSource.length > 0) {
        this.dataSource.forEach((item: any) => {
          item.forEach((subitem: any) => {
            this.dataTable.push({
              name: subitem.name,
              subjectName: subitem.subjectName,
              degree: subitem.degree,
            });
          });
        });
      }
      console.log(this.dataTable);
    });
  }
}
