import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Blog } from 'src/app/Models/blog';
import {
  DUMMY_USER_IMAGE,
  DUMMY_USER_IMAGE_LIGHT,
} from 'src/app/Models/constants';
import { AuthService } from 'src/app/Services/auth.service';
import { BlogService } from 'src/app/Services/blog.service';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss'],
})
export class BannerComponent implements OnInit, OnDestroy {
  isLoggedIn: boolean = false;
  lastBlogs: Blog = <Blog>{};
  dummyUserImage!: string;
  blogObserver!: Subscription;
  loginObserver!: Subscription;

  constructor(
    private blogService: BlogService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loginObserver = this.authService.loggerObserver.subscribe((value) => {
      this.dummyUserImage = value ? DUMMY_USER_IMAGE_LIGHT : DUMMY_USER_IMAGE;
      this.isLoggedIn = value;
    });

    this.blogObserver = this.blogService.blogSubject.subscribe(
      (blogs) => (this.lastBlogs = blogs[0])
    );
  }

  ngOnDestroy(): void {
    this.loginObserver.unsubscribe();
    this.blogObserver.unsubscribe();
  }
}
