import { Routes } from '@angular/router';
import { LoginComponent } from './pages/authorized-pages/visp-login/visp-login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { VispRegisterComponent } from './pages/authorized-pages/visp-register/visp-register.component';
import { authGuard } from './core/helpers/guards/authGuard';

export const routes: Routes = [
    {path:'',component:VispRegisterComponent},
    {path:'login', component:LoginComponent},
    
    {
        path:'',component:DashboardComponent,
        canActivateChild: [authGuard],
        children:[
            {
                path: '',
                loadChildren:()=>import('./pages/pages-routes'),  
            }  
        ]
    },
    {path:'**',component:NotFoundComponent}
];
