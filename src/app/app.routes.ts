import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ActivetimerComponent } from './activetimer/activetimer.component';



export const routes: Routes = [{path: '', component: HomeComponent},{path:'activetimer',component:ActivetimerComponent}];
