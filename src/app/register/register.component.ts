import { Component, OnInit, inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { GetControlName } from '../Models/commonFunctions';
import { UserService } from '../Services/user.service';
import { Router } from '@angular/router';
import { ValidatorsService } from '../Services/validators.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router,
    private validatorService: ValidatorsService
  ) {}

  getControlName = GetControlName;

  registrationForm: FormGroup = this.formBuilder.group({
    firstName: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    lastName: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),

    userName: new FormControl('', [
      Validators.required,
      this.validatorService.uniqueUserNameValidator(),
      this.validatorService.nospaceAllowed(),
    ]),
    email: new FormControl('', [
      Validators.required,
      Validators.email,
      this.validatorService.uniqueEmailValidator(),
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
  });

  onRegistration() {
    const { firstName, lastName, userName, email, password } =
      this.registrationForm.value;

    this.userService.registerUser(
      firstName.trim(),
      lastName.trim(),
      userName,
      email.trim(),
      password.trim()
    );

    this.router.navigate(['/login']);
  }
}
