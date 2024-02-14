import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GetControlName } from '../Models/commonFunctions';
import { UserService } from '../Services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  userService: UserService = inject(UserService);

  constructor(private formBuilder: FormBuilder) {}

  loginForm: FormGroup = this.formBuilder.group({
    userName: ['', Validators.required],
    password: ['', Validators.required],
  });

  ngOnInit(): void {
    console.log('all users', this.userService.getAllUsers());
  }
  getControlName = GetControlName;

  onLogIn() {}
}
