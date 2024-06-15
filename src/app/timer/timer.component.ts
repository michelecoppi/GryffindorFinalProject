import { Component, OnInit } from '@angular/core';
import { HistoryService } from '../history.service';
import { Cigarette } from '../model/cigarette';
import { SmokingService } from '../smoking.service';
import { Timer } from '../model/timer';


@Component({
  selector: 'app-timer',
  standalone: true,
  imports: [],
  templateUrl: './timer.component.html',
  styleUrl: './timer.component.css'
})
export class TimerComponent {

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

  constructor(private historyService: HistoryService, private smokingService: SmokingService) {
    this._timerText = "";
    this._durationSeconds = 0;
    this._seconds = 0;
    this._dateCigarette = "";
    this._timeCigarette = "";
    this._checkStartTimer = false;
    this._clipPath = "";
    this._displayButton = true;
  }

  //per l'id dell'utente ci manca ancora l'autenticazione
  ngOnInit(): void {
    this._checkLatestTimerAndCigarette();
  }

  private _startTimer(): void {
    this._displayButton = false;
    this._checkStartTimer = true;
    this.interval = setInterval(() => {
      if (this._seconds > 0) {
        this._seconds--;
        this.timerText = this._formatDuration(this._seconds);

        const progress = 100 - (this._seconds / this._durationSeconds) * 100;
        this._clipPath = `polygon(0% 0%, ${progress}% 0%, ${progress}% 100%, 0% 100%)`;


      } else {
        this._checkStartTimer = false;
        this._displayButton = true;
        clearInterval(this.interval);
      }
    }, 1000);
  }

  private _formatDuration(durationSeconds: number): string {
    const hours = Math.floor(durationSeconds / 3600);
    const minutes = Math.floor(durationSeconds % 3600 / 60);
    const seconds = durationSeconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
  }

  private _checkLatestTimerAndCigarette(): void {
    this.historyService.getLatestCigarette(1).subscribe((data) => {
      this.dateCigarette = data.date;
      this.timeCigarette = data.time;

      const localDateTime: Date = new Date();
      const dateTimeCigarette: Date = new Date(`${this.dateCigarette}T${this.timeCigarette}`);

      this.historyService.getLatesTimer(1).subscribe((data) => {
        this._checkTimerValidation(data);

        const timeDifferenceSeconds: number = Math.floor((localDateTime.getTime() - dateTimeCigarette.getTime()) / 1000);

        this.durationSeconds = data.durationSeconds! - timeDifferenceSeconds;
        if (this.durationSeconds < 0) {
          this.seconds = 0;
          this.durationSeconds = 0;
        } else {
          this.seconds = this.durationSeconds;
        }

      })

      this._startTimer();
    })
  }

  private _checkTimerValidation(timer: Timer): void {
    const timerEndDate: Date = new Date(timer.endDate!);
    timerEndDate.setHours(0,0,0,0);
   

    const localDate: Date = new Date();
    localDate.setHours(0,0,0,0);
    

    if (timerEndDate <= localDate) {
      const newTimer: Timer = {startDate: this._formatDate(localDate), userId: 1};
      this.smokingService.createTimer(newTimer).subscribe((data) => timer = data);
    }
  }

  smokeCigarette(): void {
    const localDateTime: Date = new Date();
    let localDate: string = this._formatDate(localDateTime);
    let localTime: string = this._formatTime(localDateTime);
    console.log(localDate, localTime);
    //TODO la descrizione dovrà essere inserita dall'utente
    const description: string = "pippo";
    const cigarette: Cigarette = {date: localDate, time: localTime, description: description, userId: 1};
    this.smokingService.createCigarette(cigarette).subscribe(() => this._checkLatestTimerAndCigarette());
  }

  private _formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  private _formatTime(date: Date): string {
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`
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


}
