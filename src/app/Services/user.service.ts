import { Injectable } from '@angular/core';
import { User } from '../Models/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor() {}

  users: User[] = [
    {
      id: 1,
      firstName: 'john',
      lastName: 'doe',
      userName: 'jd',
      email: 'jd@gmail.com',
      password: '123456',
    },
  ];

  getUserId() {
    const maxId = this.users.reduce(
      (maxId, user) => Math.max(user.id, maxId),
      0
    );
    return maxId + 1;
  }

  registerUser(
    firstName: string,
    lastName: string,
    userName: string,
    email: string,
    password: string
  ) {
    let id = this.getUserId();
    const user: User = {
      id,
      firstName,
      lastName,
      userName,
      email,
      password,
    };

    this.users.push(user);
  }

  getAllUsers() {
    return this.users;
  }
}
