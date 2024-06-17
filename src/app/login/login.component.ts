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

constructor(private userService: UserService, private router: Router ){}

  onSubmit(form: NgForm): void{
    const login: Login = {
      ...form.value
    }

     this.userService.login(login).subscribe({
    next: (resp)=> this.router.navigate(['start']),
    error: (err) => alert("Username o password non corretti")
   }); 
  }
}
