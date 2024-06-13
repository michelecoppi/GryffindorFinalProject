import { Component, OnInit} from '@angular/core';
import { HistoryService } from '../history.service';


@Component({
  selector: 'app-timer',
  standalone: true,
  imports: [],
  templateUrl: './timer.component.html',
  styleUrl: './timer.component.css'
})
export class TimerComponent{

  interval: any;
  timerText: string = "";
  checkStartTimer: boolean = false;
  durationSeconds: number = 60;
  seconds: number = 60;
  clipPath: string ="";
  displayButton: boolean = true;
  dateTimeCigarette: any;
  
 
    constructor(private historyService: HistoryService){}

  // ngOnInit(): void {
  //   this.historyService.getLatesTimer(1).subscribe((data)=>{
  //     this.durationSeconds = data.duration * 60;
  //     this.seconds = data.duration * 60;
  //   })

  //   this.historyService.getLatestCigarette(1).subscribe((data)=>{
  //     this.dateTimeCigarette= data.dateTime;
  //   })
  // }

    startTimer() : void {
      this.seconds= 60;
      this.durationSeconds=60;
      this.displayButton=false;
      this.checkStartTimer = true;
      this.interval = setInterval(() => {
        if(this.seconds > 0){
          this.seconds--;
          this.timerText= this.formatTime(this.seconds);

          const progress = 100 - (this.seconds / this.durationSeconds) * 100;
          this.clipPath = `polygon(0% 0%, ${progress}% 0%, ${progress}% 100%, 0% 100%)`;

          
        }else{
          this.checkStartTimer = false;
          this.displayButton = true;
          clearInterval(this.interval);
        }
      },1000);
     
    }

  formatTime(durationSeconds : number): string{
   const hours = Math.floor(durationSeconds/3600);
   const minutes = Math.floor(durationSeconds % 3600 / 60);
   const seconds = durationSeconds % 60;
   return `${hours.toString().padStart(2,'0')}:${minutes.toString().padStart(2,'0')}:${seconds.toString().padStart(2,'0')}`
  }
  

}
