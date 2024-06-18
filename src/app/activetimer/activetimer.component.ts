import { Component, OnInit } from '@angular/core';
import { Timer } from '../model/timer';
import { HistoryService } from '../history.service';
import { firstValueFrom } from 'rxjs';
import { LoadingComponent } from '../loading/loading.component';
import { Utils } from '../utils/utils';
import { NavigationComponent } from '../navigation/navigation.component';

@Component({
  selector: 'app-activetimer',
  standalone: true,
  imports: [LoadingComponent,NavigationComponent],
  templateUrl: './activetimer.component.html',
  styleUrl: './activetimer.component.css'
})
export class ActivetimerComponent implements OnInit{

  private _timer: Timer = { startDate: "", userId: -1 };
  private _loading: boolean = true;
  private _formattedDuration: string = "";



 constructor(private historyService: HistoryService) { }
  
  public get timer(): Timer {
    return this._timer;
  }

  public get formattedDuration(): string {
    return this._formattedDuration;
  }

  public get loading(): boolean {
    return this._loading;
  }


  async ngOnInit(): Promise<void> {
    await this._setActivetimer();
    this._loading = false;

  }

  private async _setActivetimer() : Promise<void>{
    const timer = await firstValueFrom(this.historyService.getLatestTimer());
    this._timer.id = timer.id;
    this._timer.durationSeconds = timer.durationSeconds;
    this._timer.startDate = timer.startDate;
    this._timer.endDate = timer.endDate;
    this._timer.userId = timer.userId;
    this._formattedDuration = Utils.formatDuration(timer.durationSeconds!);
  }


}
