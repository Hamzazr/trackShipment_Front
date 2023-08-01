import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { AuthService } from 'src/app/services/authentification-Service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit  {
  
  loginForm : FormGroup;

  constructor(
    private authService: AuthService,
    private router : Router
    ){ }

    ngOnInit(): void {
      this.loginForm = new FormGroup({
        email: new FormControl(null, [Validators.required, Validators.email, Validators.minLength(6)]),
        password: new FormControl(null, [Validators.required, Validators.minLength(3)])
      })
}
      onSubmit(){
        //this.authService.login('laaroubi@gmail.com', '1234').subscribe(date => console.log('Success'));
        if(this.loginForm.invalid) {
          return;
        }
        this.authService.login(this.loginForm.value).pipe(
          map((_token) => this.router.navigate(['home-page']))
        ).subscribe()
        
      }
}
