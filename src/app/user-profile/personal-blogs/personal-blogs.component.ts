import { Component, OnDestroy, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
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
  loaderObserver!: Subscription;

  constructor(
    private blogService: BlogService,
    private authService: AuthService,
    private toasterService: ToastrService
  ) {}

  ngOnInit(): void {
    this.blogObserver = this.blogService.blogSubject.subscribe((data) => {
      this.personalBlogs = data.filter((blog) => {
        return (
          blog.bloggrUserName === this.loggedInUser?.userName &&
          blog.bloggerUserId === this.loggedInUser?.id
        );
      });
    });

    this.loaderObserver = this.blogService.blogLoaderSubject.subscribe(
      (value) => {
        this.isLoading = value;
      }
    );

    this.errorObserver = this.blogService.blogErrorSubject.subscribe(
      (value) => {
        if (value) {
          this.toasterService.error('Sorry, an unexpected error occured.');
        }
      }
    );
  }

  ngOnDestroy(): void {
    this.blogObserver.unsubscribe();
    this.loaderObserver.unsubscribe();
    this.errorObserver.unsubscribe();
  }

  trackByBlogName(index: number, blog: Blog) {
    return blog.blogId;
  }
}
