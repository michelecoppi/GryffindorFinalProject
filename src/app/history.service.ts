import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cigarette } from './model/cigarette';
import { Timer } from './model/timer';



@Injectable({
  providedIn: 'root'
})

export class HistoryService {
  private apiUrl: string = 'http://localhost:8080/planning/users/';


  constructor(private http: HttpClient) {}

  getLatestCigarette(): Observable<Cigarette>{
    return this.http.get<Cigarette>(`${this.apiUrl}activecigarette`);
  }

  getLatestTimer(): Observable<Timer>{
    return this.http.get<Timer>(`${this.apiUrl}activetimer`);
  }
  getSavingsUntilYesterday(): Observable<number>{
    return this.http.get<number>(`${this.apiUrl}savings`)
  }

  
  
  

}