import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { User } from '../Models/user';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  users: User[] = [];

  getUserId() {
    const maxId = this.users.reduce(
      (maxId, user) => Math.max(user.id, maxId),
      0
    );
    return maxId + 1;
  }

  registerUser(formGroupData: FormGroup) {
    const id = this.getUserId();
    const { firstName, lastName, email, userName, password } =
      formGroupData.value;

    const joiningDate = new Date().toISOString();
    const user: User = {
      id,
      firstName,
      lastName,
      email,
      userName,
      password,
      joiningDate,
    };

    this.users.push(user);

    localStorage.setItem('registeredUsers', JSON.stringify(this.users));
  }

  getAllUsers() {
    return this.users;
  }

  getAllTheUsersFromLocalStorage() {
    const allUsers = localStorage.getItem('registeredUsers');

    if (allUsers) {
      this.users = JSON.parse(allUsers);
    }
  }

  updateUserInfo(id: number, formData: FormGroup, imageFileName: string) {
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

    localStorage.setItem('registeredUsers', JSON.stringify(this.users));
  }
}
