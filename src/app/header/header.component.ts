import { Component, OnInit } from '@angular/core';

import { AuthService } from '../Services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) {}
  loggedInUser = this.authService.loggedInUser;
  isLoggedInObs?: boolean;
  isLoggedIn: boolean = this.authService.isLoggedIn;

  ngOnInit(): void {
    this.authService.loggerObserver.subscribe((value) => {
      console.log(value);
      this.isLoggedInObs = value;
    });
  }

  onLogOut() {
    this.authService.onLogOut();
    this.router.navigate(['/home']);
  }
}
