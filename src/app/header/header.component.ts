import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../Services/auth.service';
import { USER } from '../Models/constants';
import { User } from '../Models/user';
import { BlogService } from '../Services/blog.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  loggedInUser?: User;
  isLoggedIn: boolean = false;
  loggerObserver!: Subscription;
  logginUserObserver!: Subscription;
  navigatorObserver!: Subscription;
  showSearchBox: boolean = false;
  searchedText: string = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private blogService: BlogService
  ) {}

  getSearchedText() {
    const searchedValue = localStorage.getItem('searchedText');

    if (searchedValue) {
      this.blogService.searchedValueSubject.next(searchedValue);
      this.searchedText = searchedValue;
    }
  }

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

    this.logginUserObserver = this.authService.loggedInUserObserver.subscribe(
      (data) => (this.loggedInUser = data)
    );

    this.loggerObserver = this.authService.loggerObserver.subscribe((data) => {
      this.isLoggedIn = data;
    });

    this.getSearchedText();
  }

  ngOnDestroy(): void {
    this.loggerObserver.unsubscribe();
    this.logginUserObserver.unsubscribe();
    this.navigatorObserver.unsubscribe();
  }

  onLogOut() {
    this.authService.onLogOut();
    this.router.navigate(['/home', { showSearchBox: true }]);
  }

  handleSearch(seacrhedValue: string) {
    this.blogService.searchedValueSubject.next(seacrhedValue);
    localStorage.setItem('searchedText', seacrhedValue);
  }
}
