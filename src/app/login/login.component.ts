import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Login } from '../model/login';
import { UserService } from '../user.service';
import { Router, RouterModule } from '@angular/router';




@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  private _showErrorMessage: boolean = false;
 
 

constructor(private userService: UserService, private router: Router ){}

public get showErrorMessage(): boolean {
  return this._showErrorMessage;
}

  onSubmit(form: NgForm): void{
    const login: Login = {
      ...form.value
    }

     this.userService.login(login).subscribe({
    next: (resp)=> {
      localStorage.setItem('token',resp.token);
      this.router.navigate(['start']);
    },
    error: (err) => {
      this._showErrorMessage=true;
      setTimeout(()=>{
        this._showErrorMessage=false;
      },3000);
      
    }
   }); 
  }
}
