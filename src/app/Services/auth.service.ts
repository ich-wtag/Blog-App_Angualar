import { Injectable } from '@angular/core';
import { LoggedInUser } from '../Models/loggedInUser';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isLoggedIn: boolean = false;
  loggedInUser: LoggedInUser = <LoggedInUser>{};

  constructor() {}

  onLogggedIn(user: LoggedInUser) {
    this.loggedInUser = user;
    this.isLoggedIn = true;
  }

  onLogOut() {
    this.isLoggedIn = false;
    this.loggedInUser = <LoggedInUser>{};

    alert('User Logged out');
  }
}
