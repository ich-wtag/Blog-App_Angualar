import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Blog } from 'src/app/Models/blog';
import { User } from 'src/app/Models/user';
import { AuthService } from 'src/app/Services/auth.service';
import { BlogService } from 'src/app/Services/blog.service';

@Component({
  selector: 'app-personal-blogs',
  templateUrl: './personal-blogs.component.html',
  styleUrls: ['./personal-blogs.component.scss'],
})
export class PersonalBlogsComponent implements OnInit, OnDestroy {
  blogObserver!: Subscription;
  personalBlogs: Blog[] = [];
  loggedInUser?: User = this.authService.loggedInUser;
  isLoading: boolean = false;
  isError: boolean = false;
  errorObserver!: Subscription;

  constructor(
    private blogService: BlogService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.blogObserver = this.blogService.blogSubject.subscribe((data) => {
      this.personalBlogs = data.filter((blog) => {
        return (
          blog.bloggrUserName === this.loggedInUser?.userName &&
          blog.bloggerUserId === this.loggedInUser?.id
        );
      });
      if (this.personalBlogs.length > 0) {
        this.isLoading = false;
      }
    });
  }

  ngOnDestroy(): void {
    this.blogObserver.unsubscribe();
  }

  trackByBlogName(index: number, blog: Blog) {
    return blog.blogId;
  }
}
