import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../Services/auth.service';
import { USER } from '../Models/constants';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  constructor(
    private authService: AuthService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  loggedInUser = this.authService.loggedInUser;
  isLoggedIn: boolean = false;
  loggerObserver!: Subscription;
  navigatorObserver!: Subscription;
  showSearchBox: boolean = false;

  ngOnInit(): void {
    this.navigatorObserver = this.router.events.subscribe(() => {
      const isStateDataAvailable =
        this.activatedRoute.snapshot.children[0].data['showSearchBox'];
      if (isStateDataAvailable) {
        this.showSearchBox = isStateDataAvailable;
      } else {
        this.showSearchBox = false;
      }
    });

    this.loggerObserver = this.authService.loggerObserver.subscribe((data) => {
      this.isLoggedIn = data;
    });
  }

  onLogOut() {
    this.authService.onLogOut();
  }
  ngOnDestroy(): void {
    this.loggerObserver.unsubscribe();
    this.navigatorObserver.unsubscribe();
  }
}
