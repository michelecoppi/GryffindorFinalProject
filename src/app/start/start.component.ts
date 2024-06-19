import { Component } from '@angular/core';
import { SleepComponent } from '../sleep/sleep.component';
import { TimerComponent } from '../timer/timer.component';
import { NavigationComponent } from '../navigation/navigation.component';

@Component({
  selector: 'app-start',
  standalone: true,
  imports: [SleepComponent,TimerComponent,NavigationComponent],
  templateUrl: './start.component.html',
  styleUrl: './start.component.css'
})
export class StartComponent {
  public checkSleepTime(): boolean {
    const localDateTime: Date = new Date();
    const minDateTime: Date = new Date();
    minDateTime.setHours(0,0,0,0);
    const maxDateTime: Date = new Date();
    maxDateTime.setHours(7,30,0,0);
    if(localDateTime >= minDateTime && localDateTime <= maxDateTime) {
      return true;
    } else {
      return false;
    }
  }
}
