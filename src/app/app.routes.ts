import { Routes } from '@angular/router';
import { LoginComponent } from './pages/authorized-pages/visp-login/visp-login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';

export const routes: Routes = [
    {path:'',component:LoginComponent},
    {
        path:'',component:DashboardComponent,
        children:[
            {
                path: '',
                loadChildren:()=>import('./pages/pages-routes')
            }  
        ]
    },
    {path:'**',component:NotFoundComponent}
];
