import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { DashbordComponent } from './layout/dashbord/dashbord.component';
import { newExamComponent } from './layout/DOctor/newExam/newExam.component';
import { SubjectComponent } from './layout/DOctor/subject/subject.component';
import { ExamComponent } from './layout/student/exam/exam.component';
import { StudentComponent } from './layout/DOctor/student/student.component';





export const routes: Routes = [

    
       

    {
        path:'',
        component:DashbordComponent,
        children:[

            {
                path:'login',
                component:LoginComponent
            },
            {
                path:'register',
                component:RegisterComponent
            },
            {
                path:'exam',
                component:newExamComponent
            },
            {
                path:'subject',
                component:SubjectComponent
            },
            {
                path:'exam/:id',
                component:ExamComponent
            },
            {
                path:'student',
                component:StudentComponent
            }
         
        ]
    }
        
    
];
