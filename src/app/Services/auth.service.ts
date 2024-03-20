import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { FormGroup } from '@angular/forms';
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

    localStorage.setItem('loggedInUser', JSON.stringify(this.loggedInUser));
    this.loggedInUserObserver.next(this.loggedInUser as User);
    this.loggerObserver.next(true);
  }

  onLogOut() {
    this.loggedInUser = <User>{};
    this.loggedInUserObserver.next(this.loggedInUser);
    this.loggerObserver.next(false);

    this.router.navigate(['/home', { showSearchBox: true }]);
    localStorage.removeItem('loggedInUser');
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
      localStorage.setItem('loggedInUser', JSON.stringify(this.loggedInUser));
    }
  }

  getLoggedInUser() {
    const user = localStorage.getItem('loggedInUser');

    if (user) {
      this.loggedInUser = JSON.parse(user);
      this.loggedInUserObserver.next(<User>this.loggedInUser);
      this.loggerObserver.next(true);
    } else {
      this.onLogOut();
    }
  }
}
