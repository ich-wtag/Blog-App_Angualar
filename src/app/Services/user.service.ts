import { Injectable } from '@angular/core';
import { User } from '../Models/user';
import { FormGroup } from '@angular/forms';

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
    const joiningDate = new Date().toISOString();

    user.id = id;
    user.joiningDate = joiningDate;

    this.users.push(user);
  }

  getAllUsers() {
    return this.users;
  }
}
