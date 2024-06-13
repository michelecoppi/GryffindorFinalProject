import { Component } from '@angular/core';
import { TimerComponent } from '../timer/timer.component';



@Component({
  selector: 'app-home',
  standalone: true,
  imports: [TimerComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
