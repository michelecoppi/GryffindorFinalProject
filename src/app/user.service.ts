import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from './model/user';
import { Login } from './model/login';
import { TokenResponse } from './model/tokenresponse';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private registerUrl: string = "http://localhost:8080/register";
  private loginUrl: string = "http://localhost:8080/login";

  constructor(private http: HttpClient) { }

  public register(user: User): Observable<User>{
    return this.http.post<User>(this.registerUrl,user);
  }
  public login(login: Login): Observable<TokenResponse>{
    return this.http.post<TokenResponse>(this.loginUrl,login);
  }
}
