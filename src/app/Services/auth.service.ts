import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UserService } from './user.service';
import { User } from '../Models/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  loggedInUser?: User;

  loggerObserver: BehaviorSubject<boolean> = new BehaviorSubject(true);

  constructor(private userService: UserService) {}

  onLogggedIn(userName: string, password: string) {
    this.loggedInUser = this.userService
      ?.getAllUsers()
      ?.find(
        (user) => user.userName === userName && user.password === password
      );

    this.loggerObserver.next(true);
  }

  onLogOut() {
    this.loggedInUser = <User>{};
    this.loggerObserver.next(false);
  }
}
