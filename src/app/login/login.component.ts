import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../Services/auth.service';
import { ValidatorsService } from '../Services/validators.service';
import { GetControlName } from '../Models/commonFunctions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private validatorService: ValidatorsService
  ) {}

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
    this.router.navigate(['/home', { showSearchBox: true }]);
  }
}
