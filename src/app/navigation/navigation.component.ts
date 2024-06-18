import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { UserService } from '../user.service';
import { UserInfo } from '../model/userinfo';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.css'
})
export class NavigationComponent implements OnInit{

  private _userInfo: UserInfo = {
    username: "",
    firstname: "",
    lastname: "",
    email: "",
    subscriptionDate: "",
    stillSmoker: false,
    startingDailyCigNums: -1,
    eachCigPrice: -1,
    dailyCigNum: -1,
  };
 
  isUserMenuOpen = false;

  constructor(private userService: UserService,private router: Router){

  }

  ngOnInit(): void {
    this.setLoggedUser();
  }

  async setLoggedUser(): Promise<void>{
    const userInfo = await firstValueFrom(this.userService.getUserInfo());
    this._userInfo={...userInfo};
  }

  toggleUserMenu() {
    this.isUserMenuOpen = !this.isUserMenuOpen;
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['']);
  }

  public get userInfo(): UserInfo {
    return this._userInfo;
  }
}
