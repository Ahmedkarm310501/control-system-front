import { Injectable } from '@angular/core';

import { BehaviorSubject, tap, catchError, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { User } from './User';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // private isLoggedIn = false;
  baseUrl = environment.baseUrl;
  isLoggedIn = new BehaviorSubject<boolean>(false);
  user = new BehaviorSubject<User>(null);
  

  constructor(private http: HttpClient) {}

  login(email: string, password: string) {
    // this.isLoggedIn = true;
    return this.http
      .post(`${this.baseUrl}/login`, {
        email: email,
        password: password,
      })
      .pipe(
        tap((res: any) => {
          this.isLoggedIn.next(true);
          let user = new User(
            res.data.token,
            res.data.user.name,
            res.data.user.is_admin
          );
          this.user.next(user);
          localStorage.setItem('user', JSON.stringify(user));
        }),
        catchError((err) => {
          // if (err.status === 401) {
          //   // err = 'Invalid username or password.';
          //   // alert('Invalid username or password.');
          // } else if (err.status === 403) {
          //   // alert('You are not activated.');
          // } else {
          //   // err = 'An error occurred while logging in. Please try again later.';
          //   // alert(
          //   //   'An error occurred while logging in. Please try again later.'
          //   // );
          // }
          return throwError(err);
        })
      );
  }

  logout() {
    this.isLoggedIn.next(false);
    this.user.next(null);
    localStorage.removeItem('user');
  }

  autoLogin() {
    let user: {
      _token: string;
      userName: string;
      isAdmin: boolean;
    } = JSON.parse(localStorage.getItem('user'));
    if (!user) {
      return;
    }
    let loadedUser = new User(user._token, user.userName, user.isAdmin);
    this.user.next(loadedUser);
    this.isLoggedIn.next(true);
  }

  isUserLoggedIn() {
    return this.isLoggedIn.value;
  }

  isAdmin() {
    return this.user.value.isAdmin;
  }
}
