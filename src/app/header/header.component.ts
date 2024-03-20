import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../Services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  constructor(private authService: AuthService, private router: Router) {}
  loggedInUser = this.authService.loggedInUser;
  isLoggedIn: boolean = false;
  loggerObserver!: Subscription;

  ngOnInit(): void {
    this.loggerObserver = this.authService.loggerObserver.subscribe((data) => {
      this.isLoggedIn = data;
    });
  }

  onLogOut() {
    this.authService.onLogOut();
  }
  ngOnDestroy(): void {
    this.loggerObserver.unsubscribe();
  }
}
