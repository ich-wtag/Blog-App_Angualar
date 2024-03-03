import { Component, OnInit } from '@angular/core';
import { Blog } from 'src/app/Models/blog';
import { User } from 'src/app/Models/user';
import { AuthService } from 'src/app/Services/auth.service';
import { BlogService } from 'src/app/Services/blog.service';

@Component({
  selector: 'app-personal-blogs',
  templateUrl: './personal-blogs.component.html',
  styleUrls: ['./personal-blogs.component.scss'],
})
export class PersonalBlogsComponent implements OnInit {
  constructor(
    private blogService: BlogService,
    private authService: AuthService
  ) {}

  personalBlogs: Blog[] = [];

  loggedInUser?: User = this.authService.loggedInUser;

  ngOnInit(): void {
    this.blogService.blogSubject.subscribe((data) => {
      this.personalBlogs = data.filter((blog) => {
        return (
          blog.bloggrUserName === this.loggedInUser?.userName &&
          blog.bloggerUserId === this.loggedInUser?.id
        );
      });
    });
  }

  trackByBlogName(index: number, blog: Blog) {
    return blog.blogId;
  }
}
