import { Component, OnInit } from '@angular/core';
import { User } from '../model/user';

import { NgForm, FormsModule } from '@angular/forms';
import { Utils } from '../utils/utils';
import { UserService } from '../user.service';
import { Router, RouterModule } from '@angular/router';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  constructor(private userService: UserService, private router: Router) { }

  onSubmit(form: NgForm): void {


    const u: User = {
      username: "",
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      age: 0,
      gender: "",
      subscriptionDate: "",
      stillSmoker: false,
      eachCigPrice: 0,
      startingDailyCigNums: 0,
      dailyCigNum: 0
    } 



   u.username = form.value.username;
   u.firstname = form.value.firstname;
   u.lastname = form.value.lastname;
   u.email = form.value.email;
   u.password = form.value.password;
   u.age = form.value.age;
   u.gender = form.value.gender;
   u.subscriptionDate = Utils.formatDate(new Date());
   u.stillSmoker = form.value.smokerChecker;
   u.eachCigPrice = (+form.value.cigPackPrice)/20;
   u.dailyCigNum = form.value.dailyCigNum;
   u.startingDailyCigNums = form.value.dailyCigNum;
   this.userService.register(u).subscribe({
    next: (resp)=> this.router.navigate(['']),
    error: (err) => alert("Errore! Controlla di aver inserito tutti i campi correttamente")
   });
  }
}
