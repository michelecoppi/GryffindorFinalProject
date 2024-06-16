import { Component, OnInit } from '@angular/core';
import { TimerComponent } from '../timer/timer.component';
import { SleepComponent } from '../sleep/sleep.component';



@Component({
  selector: 'app-home',
  standalone: true,
  imports: [TimerComponent, SleepComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  
  //serve per controllare che dalle 00:00 alle 8:00 non si possa fumare
  public checkSleepTime(): boolean {
    const localDateTime: Date = new Date();
    const minDateTime: Date = new Date();
    minDateTime.setHours(0,0,0,0);
    const maxDateTime: Date = new Date();
    maxDateTime.setHours(8,0,0,0);//TODO rimetti le otto di mattina
    if(localDateTime >= minDateTime && localDateTime <= maxDateTime) {
      return true;
    } else {
      return false;
    }
  }
  
}
