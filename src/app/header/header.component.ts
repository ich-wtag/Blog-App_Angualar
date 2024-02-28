import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../Services/auth.service';
import { USER } from '../Models/constants';

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
  navigatorObserver!: Subscription;
  showSearchBox: boolean = false;

  ngOnInit(): void {
    this.navigatorObserver = this.router.events.subscribe(() => {
      this.checkRoute();
    });

    this.loggerObserver = this.authService.loggerObserver.subscribe((data) => {
      this.isLoggedIn = data;
    });
  }

  onLogOut() {
    this.authService.onLogOut();
    this.router.navigate(['/home']);
  }
  ngOnDestroy(): void {
    this.loggerObserver.unsubscribe();
    this.navigatorObserver.unsubscribe();
  }

  checkRoute(): void {
    const currentRoute = this.router.url;
    this.showSearchBox = currentRoute === '/' || currentRoute === '/home';
  }
}
