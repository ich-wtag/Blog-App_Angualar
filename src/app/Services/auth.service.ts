import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { FormGroup } from '@angular/forms';
import { UserService } from './user.service';
import { User } from '../Models/user';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthResponse } from '../Models/authResponse';
import { USER } from '../Models/constants';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  loggedInUser?: User;

  loggedInUserObserver: BehaviorSubject<User> = new BehaviorSubject(
    this.loggedInUser as User
  );
  loggerObserver: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(
    private userService: UserService,
    private router: Router,
    private httpClient: HttpClient
  ) {}

  onLogggedIn(userName: string, password: string) {
    const user = this.userService
      ?.getAllUsers()
      ?.find(
        (user) => user.userName === userName && user.password === password
      );

    const requiredData = {
      email: user?.email,
      password,
      returnSecureToken: true,
    };

    this.httpClient
      .post<AuthResponse>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDwM-ShZnxIb2edxgTLLOdK9DFaxyvFPRw',
        requiredData
      )
      .subscribe((data) => {
        console.log(data);

        const { expiresIn, idToken, localId } = data;
        if (user) {
          this.loggedInUser = {
            ...user,
            id: localId,
            expiresIn,
            idToken,
          };
          this.loggedInUserObserver.next(this.loggedInUser as User);
          this.loggerObserver.next(true);

          localStorage.setItem(
            'loggedInUser',
            JSON.stringify(this.loggedInUser)
          );
        }
      });
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
