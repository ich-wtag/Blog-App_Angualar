import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GetControlName } from '../Models/commonFunctions';
import { UserService } from '../Services/user.service';
import { AuthService } from '../Services/auth.service';
import { LoggedInUser } from '../Models/loggedInUser';
import { ValidatorsService } from '../Services/validators.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  userService: UserService = inject(UserService);
  authService: AuthService = inject(AuthService);
  validatorService: ValidatorsService = inject(ValidatorsService);
  router: Router = inject(Router);

  constructor(private formBuilder: FormBuilder) {}

  registeredUser = this.userService.getAllUsers();

  loginForm: FormGroup = this.formBuilder.group({
    userName: [
      '',
      [
        Validators.required,
        this.validatorService.registeredUserNameValidator(),
      ],
    ],
    password: [
      '',
      [Validators.required, this.validatorService.validPasswordValidator()],
    ],
  });

  getControlName = GetControlName;

  onLogIn() {
    const { userName, password } = this.loginForm.value;

    const loggedInUser = new LoggedInUser(userName.trim(), password);

    this.authService.onLogggedIn(loggedInUser);

    this.router.navigate(['/home']);
  }
}
