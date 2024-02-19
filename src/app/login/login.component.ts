import { Component, OnInit, inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { GetControlName } from '../Models/commonFunctions';
import { UserService } from '../Services/user.service';
import { AuthService } from '../Services/auth.service';
import { ValidatorsService } from '../Services/validators.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private userService: UserService,
    private router: Router,
    private validatorService: ValidatorsService
  ) {}

  registeredUser = this.userService.getAllUsers();

  loginForm: FormGroup = this.formBuilder.group({
    userName: new FormControl('', [
      Validators.required,
      this.validatorService.registeredUserNameValidator(),
    ]),
    password: new FormControl('', [
      Validators.required,
      this.validatorService.validPasswordValidator(),
    ]),
  });

  getControlName = GetControlName;

  onLogIn() {
    const { userName, password } = this.loginForm.value;

    this.authService.onLogggedIn(userName, password);

    this.router.navigate(['/home']);
  }
}
