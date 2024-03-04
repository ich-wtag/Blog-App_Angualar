import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UserService } from './user.service';
import { User } from '../Models/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  loggedInUser?: User = {
    id: 1,
    firstName: 'john',
    lastName: 'doe',
    userName: 'jd',
    email: 'jd@gmail.com',
    joiningDate: '2024-02-20T08:45:10.940Z',
    password: '123456',
  };

  loggerObserver: BehaviorSubject<boolean> = new BehaviorSubject(false);

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
