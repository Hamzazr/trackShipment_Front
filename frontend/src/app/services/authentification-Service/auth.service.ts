import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { map } from 'rxjs';
import { User } from 'src/app/components/models/user.interface';


export interface LoginForm {
  email: string;
  password: string;
}

export const JWT_NAME = 'JWT_SECRET';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private jwtHelper: JwtHelperService) { }

  login(loginForm: LoginForm) {

    return this.http.post<any>('/api/users/login', {email: loginForm.email, password: loginForm.password}).pipe(
      map((token) => {
        console.log('token');
        localStorage.setItem(JWT_NAME, token.access_token);
        return token;
      })
    )
  }

  logout() {
    localStorage.removeItem(JWT_NAME);
  }


  register(user: User) {
    return this.http.post<any>('/api/users/register', user);
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem(JWT_NAME);
    return !this.jwtHelper.isTokenExpired(token!);
  }

  
}
