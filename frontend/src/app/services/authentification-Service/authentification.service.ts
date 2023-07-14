import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { map } from 'rxjs/operators';


export interface LoginForm {
  email: string;
  password: string;
}

export interface User {
    first_name: string;

    last_name: string;

    adresse: string;

    ville: string;

    email: string;

    password: string;
}

@Injectable({
  providedIn: 'root'

})
export class AuthentificationService {

  constructor(private http: HttpClient) { }

  login(loginForm: LoginForm) {

    return this.http.post<any>('/api/users/login', {email: loginForm.email, password: loginForm.password}).pipe(
      map((token) => {
        console.log('token');
        localStorage.setItem('Token_H', token.access_token);
        return token;
      })
    )
  }

  register(user: User) {
    return this.http.post<any>('/api/users/register', user);
  }
}
