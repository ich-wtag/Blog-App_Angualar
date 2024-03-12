import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { FormGroup } from '@angular/forms';
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

  loggedInUserObserver: BehaviorSubject<User> = new BehaviorSubject(
    this.loggedInUser as User
  );

  loggerObserver: BehaviorSubject<boolean> = new BehaviorSubject(true);

  constructor(private userService: UserService) {}

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
  }

  updateLoginUser(
    currentUser: User,
    formData: FormGroup,
    imageFileName: string
  ) {
    const { name, subTitle, about, profileImage } = formData.value;
    const [firstName, lastName] = name.split(' ');

    if (name.length && subTitle && about && profileImage) {
      this.loggedInUser = {
        id: currentUser.id,
        firstName,
        lastName,
        userName: currentUser.userName,
        password: currentUser.password,
        email: currentUser.email,
        joiningDate: currentUser.joiningDate,
        about,
        subTitle,
        image: profileImage,
        imageFileName,
      };

      this.loggedInUserObserver.next(this.loggedInUser);
    }
  }
}
