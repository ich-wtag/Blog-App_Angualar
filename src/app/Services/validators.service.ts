import { Injectable, OnInit, inject } from '@angular/core';
import { UserService } from './user.service';
import { AbstractControl, FormControl, ValidatorFn } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class ValidatorsService implements OnInit {
  userService: UserService = inject(UserService);
  constructor() {}

  allUsers = this.userService.getAllUsers();
  patternValidator(): ValidatorFn {
    console.log(this.allUsers);
    return (control: AbstractControl) => {
      let presentUserName = this.allUsers?.find(
        (user) => user.userName === control.value
      );
      if (presentUserName) {
        return { userNameError: true };
      }
      return null;
      // const regex = new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$');
      // const valid = regex.test(control.value);
      // return valid ? null : { invalidPassword: true };
    };
  }

  // userNameVal(control: FormControl) {
  //   console.log(control);
  //   console.log(this.allUsers);
  // }

  ngOnInit(): void {}
}
