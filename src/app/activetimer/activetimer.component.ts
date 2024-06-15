import { Component, OnInit } from '@angular/core';
import { Timer } from '../model/timer';
import { HistoryService } from '../history.service';

@Component({
  selector: 'app-activetimer',
  standalone: true,
  imports: [],
  templateUrl: './activetimer.component.html',
  styleUrl: './activetimer.component.css'
})
export class ActivetimerComponent implements OnInit{

  private _timer: Timer = { startDate: "", userId: -1 };
  private _formattedDuration: string = "";


 constructor(private hisotryService: HistoryService) { }
  
  public get timer(): Timer {
    return this._timer;
  }

  public get formattedDuration(): string {
    return this._formattedDuration;
  }


  ngOnInit() {
    this.setActivetimer();
    console.log(this._timer);

  }

  setActivetimer() : void{
    this.hisotryService.getLatesTimer(1).subscribe(timer => {
      this._timer.id = timer.id;
      this._timer.durationSeconds = timer.durationSeconds;
      this._timer.startDate = timer.startDate;
      this._timer.endDate = timer.endDate;
      this._timer.userId = timer.userId;
      this._formattedDuration = this._formatDuration(timer.durationSeconds!);
      });
  }

  private _formatDuration(durationSeconds: number): string {
    const hours = Math.floor(durationSeconds / 3600);
    const minutes = Math.floor(durationSeconds % 3600 / 60);
    const seconds = durationSeconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
  }

}
