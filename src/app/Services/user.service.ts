import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { User } from '../Models/user';
import { AuthService } from './auth.service';
import { HttpClient } from '@angular/common/http';
import { AuthResponse } from '../Models/authResponse';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  users!: User[];

  constructor(private httpClient: HttpClient) {}

  registerUser(formGroupData: FormGroup) {
    const { firstName, lastName, email, userName, password } =
      formGroupData.value;

    const joiningDate = new Date().toISOString();

    const requiredData = {
      email,
      password,
      returnSecureToken: true,
    };

    this.httpClient
      .post<AuthResponse>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDwM-ShZnxIb2edxgTLLOdK9DFaxyvFPRw',
        requiredData
      )
      .subscribe((data) => {
        const { localId } = data;

        const user: User = {
          id: localId,
          firstName,
          lastName,
          email,
          userName,
          password,
          joiningDate,
          image: '',
          imageFileName: '',
          subTitle: '',
          about: '',
        };

        this.httpClient
          .put(
            'https://blog-angular-a0e04-default-rtdb.asia-southeast1.firebasedatabase.app/users/' +
              localId +
              '.json',
            user
          )
          .subscribe((data) => {
            this.users.push(user);

            this.getAllUsers();
          });
      });
  }

  getAllUsers() {
    return this.users;
  }

  updateUserInfo(id: string, formData: FormGroup, imageFileName: string) {
    const { name, subTitle, profileImage, about } = formData.value;
    const [firstName, lastName] = name.split(' ');

    this.users = this.users.map((user) => {
      if (user.id === id) {
        user.about = about;
        user.firstName = firstName;
        user.lastName = lastName;
        user.subTitle = subTitle;
        user.image = profileImage;
        user.imageFileName = imageFileName;
      }
      return user;
    });
  }

  getAllTheUsersFromLocalStorage() {
    this.httpClient
      .get<{ [key: string]: User }>(
        'https://blog-angular-a0e04-default-rtdb.asia-southeast1.firebasedatabase.app/users.json'
      )
      .pipe(
        map((response) => {
          let registeredUsers = [];

          for (let key in response) {
            if (response.hasOwnProperty(key)) {
              registeredUsers.push(response[key]);
            }
          }
          return registeredUsers;
        })
      )
      .subscribe((data) => (this.users = data));
  }
}
