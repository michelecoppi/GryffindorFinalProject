import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from './model/user';
import { Login } from './model/login';
import { TokenResponse } from './model/tokenresponse';
import { UserInfo } from './model/userinfo';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private localhostUrl: string = "http://localhost:8080/";

  constructor(private http: HttpClient) { }

  public register(user: User): Observable<User>{
    return this.http.post<User>(`${this.localhostUrl}register`,user);
  }
  public login(login: Login): Observable<TokenResponse>{
    return this.http.post<TokenResponse>(`${this.localhostUrl}login`,login);
  }
  public getUserInfo() : Observable<UserInfo>{
    return this.http.get<UserInfo>(`${this.localhostUrl}userinfo`);
  }
}
