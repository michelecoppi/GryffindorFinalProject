import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ActivetimerComponent } from './activetimer/activetimer.component';
import { RegisterComponent } from './register/register.component';
import { StartComponent } from './start/start.component';
import { SavingsComponent } from './savings/savings.component';
import { authGuard } from './auth.guard';



export const routes: Routes = [
    {path: '', component: HomeComponent},
    {path:'activetimer', component: ActivetimerComponent, canActivate:[authGuard]},
    {path:'register', component: RegisterComponent},
    {path:'start', component: StartComponent, canActivate:[authGuard]},
    {path:'savings', component: SavingsComponent, canActivate:[authGuard]}
];
