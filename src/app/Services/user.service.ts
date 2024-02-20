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
      joiningDate: '2024-02-20T08:45:10.940Z',
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
    const id = this.getUserId();
    const joiningDate = new Date().toISOString();
    const user: User = {
      id,
      firstName,
      lastName,
      userName,
      email,
      joiningDate,
      password,
    };

    this.users.push(user);
  }

  getAllUsers() {
    return this.users;
  }
}
