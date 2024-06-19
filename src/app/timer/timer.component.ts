import { Component, OnInit } from '@angular/core';
import { HistoryService } from '../history.service';
import { Cigarette } from '../model/cigarette';
import { SmokingService } from '../smoking.service';
import { Timer } from '../model/timer';
import { LoadingComponent } from '../loading/loading.component';
import { firstValueFrom } from 'rxjs';
import { Utils } from '../utils/utils';
import { FormComponent } from '../modalform/modalform.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';


@Component({
  selector: 'app-timer',
  standalone: true,
  imports: [LoadingComponent, FormComponent, MatDialogModule, MatButtonModule],
  templateUrl: './timer.component.html',
  styleUrl: './timer.component.css'
})
export class TimerComponent implements OnInit{

  private interval: any;
  private _timerText: string;
  private _durationSeconds: number;
  private _seconds: number;
  private _dateCigarette: string;
  private _timeCigarette: string;

  //HTML
  private _checkStartTimer: boolean;
  private _clipPath: string;
  private _displayButton: boolean;

  //LOADING
  private _loading: boolean;

  constructor(private historyService: HistoryService, private smokingService: SmokingService, private dialog: MatDialog) {
    this._timerText = "";
    this._durationSeconds = 0;
    this._seconds = 0;
    this._dateCigarette = "";
    this._timeCigarette = "";
    this._checkStartTimer = false;
    this._clipPath = "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)";
    this._displayButton = true;
    this._loading = true;
  }

  //per l'id dell'utente ci manca ancora l'autenticazione
  async ngOnInit(): Promise<void> {
    await this._checkLatestTimerAndCigarette();
    this._loading = false;
  }

  public showForm(): void {
    const dialogRef = this.dialog.open(FormComponent, {
      width: '300px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== null) {
        if(result.trim()===''){
          result = "No description";
        }
        console.log(result);
        this._loading=true;
        this.smokeCigarette(result);
      }
    });
  }

  private _startTimer(): void {
    this._displayButton = false;
    this._checkStartTimer = true;
    this.interval = setInterval(() => {
      if (this._seconds > 0) {
        this._seconds--;
        this.timerText = Utils.formatDuration(this._seconds);

        const progress = 100 - (this._seconds / this._durationSeconds) * 100;
        this._clipPath = `polygon(0% 0%, ${progress}% 0%, ${progress}% 100%, 0% 100%)`;


      } else {
        this._checkStartTimer = false;
        this._displayButton = true;
        clearInterval(this.interval);
      }
    }, 1000);
  }

  private async _checkLatestTimerAndCigarette(): Promise<void> {
    const latestCigarette = await firstValueFrom(this.historyService.getLatestCigarette());
    let dateTimeCigarette: Date = new Date('1970-01-01');
    if(latestCigarette !== null){
      this.dateCigarette = latestCigarette.date;
      this.timeCigarette = latestCigarette.time;
      dateTimeCigarette = new Date(`${this.dateCigarette}T${this.timeCigarette}`);
    }

    const localDateTime: Date = new Date();

    const latestTimer = await firstValueFrom(this.historyService.getLatestTimer());
    await this._checkTimerValidation(latestTimer);

    const timeDifferenceSeconds: number = Math.floor((localDateTime.getTime() - dateTimeCigarette.getTime()) / 1000);

    this.durationSeconds = latestTimer.durationSeconds! - timeDifferenceSeconds;
    if (this.durationSeconds < 0) {
      this.seconds = 0;
      this.durationSeconds = 0;
    } else {
      this.seconds = this.durationSeconds;
    }
    if (this.durationSeconds != 0){
      this._startTimer();
    }
 
  }

  private async _checkTimerValidation(timer: Timer): Promise<void> {
    const timerEndDate: Date = new Date(timer.endDate!);
    timerEndDate.setHours(0, 0, 0, 0);

    const localDate: Date = new Date();
    localDate.setHours(0, 0, 0, 0);

    if (timerEndDate <= localDate) {
      const newTimer: Timer = { startDate: Utils.formatDate(localDate)};
      const createdTimer = await firstValueFrom(this.smokingService.createTimer(newTimer));
      timer = createdTimer;
    }
  }

   smokeCigarette(description: string): void {
    const localDateTime: Date = new Date();
    let localDate: string = Utils.formatDate(localDateTime);
    let localTime: string = Utils.formatTime(localDateTime);
    //TODO la descrizione dovrà essere inserita dall'utente
    const cigarette: Cigarette = {date: localDate, time: localTime, description: description};
    this.smokingService.createCigarette(cigarette).subscribe(async () => {
      await this._checkLatestTimerAndCigarette();
      this._loading=false;
    });

  }

  public get timerText(): string {
    return this._timerText;
  }
  public set timerText(value: string) {
    this._timerText = value;
  }

  public get durationSeconds(): number {
    return this._durationSeconds;
  }
  public set durationSeconds(value: number) {
    this._durationSeconds = value;
  }

  public get seconds(): number {
    return this._seconds;
  }
  public set seconds(value: number) {
    this._seconds = value;
  }

  public get dateCigarette(): string {
    return this._dateCigarette;
  }
  public set dateCigarette(value: string) {
    this._dateCigarette = value;
  }

  public get timeCigarette(): string {
    return this._timeCigarette;
  }
  public set timeCigarette(value: string) {
    this._timeCigarette = value;
  }

  public get checkStartTimer(): boolean {
    return this._checkStartTimer;
  }
  public set checkStartTimer(value: boolean) {
    this._checkStartTimer = value;
  }

  public get clipPath(): string {
    return this._clipPath;
  }
  public set clipPath(value: string) {
    this._clipPath = value;
  }

  public get displayButton(): boolean {
    return this._displayButton;
  }
  public set displayButton(value: boolean) {
    this._displayButton = value;
  }
  public get loading(): boolean {
    return this._loading;
  }


}
