import { inject } from '@angular/core';
import { UserService } from '../Services/user.service';
import { AbstractControl, FormControl } from '@angular/forms';

export class CustomValidators {
  userService: UserService = inject(UserService);
  // constructor(private userS: UserService) {}

  usersList = this.userService.getAllUsers();

  static userNameValidators(formControl: FormControl) {
    console.log(formControl.value, UserService.prototype?.users);
    let userName = UserService.prototype?.users?.find((user) => {
      user.userName === formControl.value;
    });

    if (userName != undefined && userName != null) {
      return { userNameValidators: true };
    }
    return null;
  }

  static checkUsername(control: AbstractControl): Promise<any> {
    return userNameAllowed(control.value);
  }
}
function userNameAllowed(username: string) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log(username, UserService.prototype?.users);
      let userName = UserService.prototype.users?.find(
        (user) => user.userName === username
      );
      if (userName) {
        resolve({ checkUsername: true });
      } else {
        resolve(null);
      }
    }, 2000);
  });
}
