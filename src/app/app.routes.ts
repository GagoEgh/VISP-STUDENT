import { Routes } from '@angular/router';
import { LoginComponent } from './pages/authorized-pages/visp-login/visp-login.component';
import { HomeComponent } from './pages/home/home.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { EducationalComponent } from './pages/educational/educational.component';
import { FamilyComponent } from './pages/family/family.component';
import { GradesComponent } from './pages/grades/grades.component';
import { HostelComponent } from './pages/hostel/hostel.component';
import { IssuesComponent } from './pages/issues/issues.component';
import { PersonalInfoComponent } from './pages/personal-info/personal-info.component';
import { ProctorComponent } from './pages/proctor/proctor.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';

export const routes: Routes = [
    {path:'',component:LoginComponent},
    {
        path:'',component:DashboardComponent,
        children:[
            {path:'home',component:HomeComponent},
            {path:'educational',component:EducationalComponent},
            {path:'family',component:FamilyComponent},
            {path:'grades',component:GradesComponent},
            {path:'hostel',component:HostelComponent},
            {path:'issues',component:IssuesComponent},
            {path:'personal-info',component:PersonalInfoComponent},
            {path:'proctor',component:ProctorComponent},
            
        ]
    },
    {path:'**',component:NotFoundComponent}
];
