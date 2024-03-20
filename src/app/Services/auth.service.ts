import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UserService } from './user.service';
import { User } from '../Models/user';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  loggedInUser?: User;

  loggedInUserObserver: BehaviorSubject<User> = new BehaviorSubject(
    this.loggedInUser as User
  );
  loggerObserver: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(private userService: UserService, private router: Router) {}

  onLogggedIn(userName: string, password: string) {
    this.loggedInUser = this.userService
      ?.getAllUsers()
      ?.find(
        (user) => user.userName === userName && user.password === password
      );

    this.loggedInUserObserver.next(this.loggedInUser as User);
    this.loggerObserver.next(true);
  }

  onLogOut() {
    this.loggedInUser = <User>{};
    this.loggedInUserObserver.next(this.loggedInUser);
    this.loggerObserver.next(false);

    this.router.navigate(['/home', { showSearchBox: true }]);
  }
}
