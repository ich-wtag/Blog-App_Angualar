import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GetControlName } from '../Models/commonFunctions';
import { UserService } from '../Services/user.service';
import { Router } from '@angular/router';
import { CustomValidators } from '../Validators/customValidators';
import { ValidatorsService } from '../Services/validators.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  userService: UserService = inject(UserService);
  router: Router = inject(Router);

  validServ: ValidatorsService = inject(ValidatorsService);

  // customValidators: ValidatorsService = inject(ValidatorsService);

  getControlName = GetControlName;
  // val = this.validServ.userNameVal;

  constructor(private formBuilder: FormBuilder) {}
  registrationForm: FormGroup = this.formBuilder.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    userName: [
      '',
      [
        Validators.required,
        this.validServ.patternValidator.bind(this.validServ),
      ],

      // [
      //   Validators.required,
      //   this.customValidators.userNameValidators,

      //   // CustomValidators.userNameValidator(),
      // ],
    ],
    email: ['', Validators.required],
    password: ['', [Validators.required, Validators.minLength(2)]],
  });

  onRegistration() {
    let allUser = this.userService.getAllUsers();
    const { firstName, lastName, userName, email, password } =
      this.registrationForm.value;

    console.log(this.registrationForm.controls['userName']);
    console.log(allUser);
    this.userService.registerUser(
      firstName,
      lastName,
      userName,
      email,
      password
    );

    // this.router.navigate(['/login']);
  }
  ngOnInit(): void {}
}
