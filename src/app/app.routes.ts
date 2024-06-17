import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ActivetimerComponent } from './activetimer/activetimer.component';
import { RegisterComponent } from './register/register.component';
import { StartComponent } from './start/start.component';
import { SavingsComponent } from './savings/savings.component';



export const routes: Routes = [
    {path: '', component: HomeComponent},
    {path:'activetimer', component: ActivetimerComponent},
    {path:'register', component: RegisterComponent},
    {path:'start', component: StartComponent},
    {path:'savings', component: SavingsComponent}
];
