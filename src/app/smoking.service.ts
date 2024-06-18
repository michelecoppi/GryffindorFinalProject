import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cigarette } from './model/cigarette';
import { Observable } from 'rxjs';
import { Timer } from './model/timer';


@Injectable({
  providedIn: 'root'
})
export class SmokingService {
  private apiUrl: string = 'http://localhost:8080/planning/users/';

  constructor(private http: HttpClient) { }

  createCigarette(cigarette: Cigarette): Observable<Cigarette> {
    return this.http.post<Cigarette>(`${this.apiUrl}cigarette`, cigarette);
  }

  createTimer(timer: Timer): Observable<Timer> {
    return this.http.post<Timer>(`${this.apiUrl}timer`, timer);
  }
}
