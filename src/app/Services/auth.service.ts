import { Injectable } from '@angular/core';
import { LoggedInUser } from '../Models/loggedInUser';
import { UserService } from './user.service';
import { User } from '../Models/user';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isLoggedIn: boolean = false;
  loggedInUser?: User;

  loggerObserver: BehaviorSubject<boolean> = new BehaviorSubject(
    this.isLoggedIn
  );

  constructor(private userService: UserService) {}

  onLogggedIn(userName: string, password: string) {
    this.loggedInUser = this.userService
      ?.getAllUsers()
      ?.find(
        (user) => user.userName === userName && user.password === password
      );
    this.isLoggedIn = true;
    this.loggerObserver.next(this.isLoggedIn);
  }

  onLogOut() {
    this.isLoggedIn = false;
    this.loggedInUser = <User>{};
    this.loggerObserver.next(this.isLoggedIn);
  }
}
