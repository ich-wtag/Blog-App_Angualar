import { Component, OnInit } from '@angular/core';
import { Event, NavigationEnd, Router } from '@angular/router';
import { BlogService } from './Services/blog.service';
import { AuthService } from './Services/auth.service';
import { UserService } from './Services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'Blog App';
  showHeader: boolean = false;

  constructor(
    private router: Router,
    private blogService: BlogService,
    private authService: AuthService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.router.events.subscribe((routerEvent: Event) => {
      if (routerEvent instanceof NavigationEnd) {
        if (routerEvent.url === '/register' || routerEvent.url === '/login') {
          this.showHeader = false;
        } else {
          this.showHeader = true;
        }
      }
    });

    this.userService.getAllTheUsersFromLocalStorage();
    this.authService.getLoggedInUser();
    this.blogService.getAllBlogsFromDb();
  }
}
