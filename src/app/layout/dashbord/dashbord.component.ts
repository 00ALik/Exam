import { CommonModule } from "@angular/common";
import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { RouterModule, RouterOutlet } from "@angular/router";
import { AuthService } from "../../auth/services/auth.service";

@Component({
  selector: "app-dashbord",
  standalone: true,
  imports: [RouterModule, RouterOutlet, CommonModule],
  templateUrl: "./dashbord.component.html",
  styleUrl: "./dashbord.component.scss",
})
export class DashbordComponent implements OnInit {
  Users: any = null;

  constructor(private api: AuthService) {}

  ngOnInit(): void {
    this.api.user.subscribe((res: any) => {
      if (res.role) {
        this.Users = res;
      }
    });
  }
  logOut() {
    const model = {};
    this.api.loginService(model).subscribe((res: any) => {
      this.Users = null;
      this.api.user.next(res);
    });
  }
}
