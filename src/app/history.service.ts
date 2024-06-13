import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Cigarette{
  id: number;
  date: string;
  time: string;
  description: string;
  userId: number;
}

export interface Timer{
  id: number;
  startDate: string;
  endDate: string;
  duration: number;
  userId: number;
  username: string;
  firstname: string;
  lastname: string;
}

@Injectable({
  providedIn: 'root'
})

export class HistoryService {
  private apiUrl: string = 'localhost:8080/planning/users/';


  constructor(private http: HttpClient) {}

  getLatestCigarette(idUser: number): Observable<Cigarette>{
    return this.http.get<Cigarette>(`${this.apiUrl}${idUser}/activecigarette`);
  }

  getLatesTimer(idUser: number): Observable<Timer>{
    return this.http.get<Timer>(`${this.apiUrl}${idUser}/activetimer`);
  }

}