import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // private isLoggedIn = false;
  isLoggedIn = new BehaviorSubject<boolean>(true);

  constructor() {}

  login() {
    // this.isLoggedIn = true;
    this.isLoggedIn.next(true);
  }

  logout() {
    // this.isLoggedIn = false;
    this.isLoggedIn.next(false);
  }

  isUserLoggedIn(): boolean {
    // return this.isLoggedIn;
    return this.isLoggedIn.value;
  }
}
