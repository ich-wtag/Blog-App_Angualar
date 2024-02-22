import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { User } from '../Models/user';

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

    const user: User = { id, firstName, lastName, email, userName, password };

    this.users.push(user);
  }

  getAllUsers() {
    return this.users;
  }
}
