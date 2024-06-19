import { Component, OnInit } from '@angular/core';
import { NavigationComponent } from '../navigation/navigation.component';
import { HistoryService } from '../history.service';
import { firstValueFrom } from 'rxjs';
import { LoadingComponent } from '../loading/loading.component';

@Component({
  selector: 'app-savings',
  standalone: true,
  imports: [NavigationComponent, LoadingComponent],
  templateUrl: './savings.component.html',
  styleUrl: './savings.component.css'
})
export class SavingsComponent implements OnInit{

  private _loading: boolean = true;
  private _displayedSavings: number = 0;
  private _savings: number = -1;

  constructor(private historyService: HistoryService){}



 async ngOnInit(): Promise<void> {
    await this._setSavings();
    this._animateSavings();
    this._loading = false;

  }

  private async _setSavings() : Promise<void>{
    this._savings = await firstValueFrom(this.historyService.getSavingsUntilYesterday());

  }

  private _animateSavings() {
    const duration = 2000;
    const frameDuration = 1000 / 60; 
    const totalFrames = duration / frameDuration;
    const increment = this.savings / totalFrames;
    
    let currentFrame = 0;

    const counter = setInterval(() => {
      currentFrame++;
      this._displayedSavings += increment;

      if (currentFrame >= totalFrames) {
        clearInterval(counter);
        this._displayedSavings = this.savings;
      }

      this._displayedSavings = parseFloat(this._displayedSavings.toFixed(2));
      
    }, frameDuration);
  }

  public get loading(): boolean {
    return this._loading;
  }
  public get savings(): number {
    return this._savings;
  }
  public get displayedSavings(): number{
    return this._displayedSavings;
  }

}
