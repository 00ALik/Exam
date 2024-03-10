import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterOutlet } from '@angular/router';
import { AuthService } from './auth/services/auth.service';
import { sharedModule } from '../shared/shared.module';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet,  RouterModule, sharedModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {


  constructor(private api:AuthService){

  }

  ngOnInit(): void {
    this.getUserData()
  }

  getUserData(){
    this.api.getRole().subscribe((res:any)=>{
      this.api.user.next( res);
    })
  }

}
