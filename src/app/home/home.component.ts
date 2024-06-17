import { Component, OnInit } from '@angular/core';
import { LoginComponent } from '../login/login.component';



@Component({
  selector: 'app-home',
  standalone: true,
  imports: [LoginComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  
  //serve per controllare che dalle 00:00 alle 8:00 non si possa fumare
  
  
}
