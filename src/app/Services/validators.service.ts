import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class ValidatorsService {
  constructor(private userService: UserService) {}

  allUsers = this.userService.getAllUsers();

  uniqueUserNameValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const existingUserName = this.allUsers?.find(
        (user) => user.userName === control.value
      );

      return !existingUserName ? null : { uniqueUserNameError: true };
    };
  }

  uniqueEmailValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const existingEmail = this.allUsers?.find(
        (user) => user.email === control.value
      );

      return !existingEmail ? null : { uniqueEmailError: true };
    };
  }

  registeredUserNameValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      let registeredUser;
      control.value &&
        (registeredUser = this.allUsers?.find(
          (user) => user.userName === control.value
        ));

      return registeredUser ? null : { registeredUser: true };
    };
  }

  validPasswordValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const validPassword = this.allUsers?.find(
        (user) => user.password === control.value
      );

      return validPassword ? null : { validPassword: true };
    };
  }

  noSpaceAllowed(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (control.value != null && control.value.indexOf(' ') != -1) {
        return { noSpaceAllowed: true };
      }
      return null;
    };
  }
}
