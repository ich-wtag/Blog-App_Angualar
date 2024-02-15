import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  userService: UserService = inject(UserService);
  router: Router = inject(Router);

  validatorService: ValidatorsService = inject(ValidatorsService);

  getControlName = GetControlName;

  constructor(private formBuilder: FormBuilder) {}

  registrationForm: FormGroup = this.formBuilder.group({
    firstName: ['', [Validators.required, Validators.minLength(3)]],
    lastName: ['', [Validators.required, Validators.minLength(3)]],
    userName: [
      '',
      [
        Validators.required,
        this.validatorService.uniqueUserNameValidator(),
        this.validatorService.nospaceAllowed(),
      ],
    ],
    email: [
      '',
      [
        Validators.required,
        Validators.email,
        this.validatorService.uniqueEmailValidator(),
      ],
    ],
    password: ['', [Validators.required, Validators.minLength(6)]],
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
