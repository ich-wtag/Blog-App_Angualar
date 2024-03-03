import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from './auth.service';
import { UserService } from './user.service';
import { Blog } from '../Models/blog';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class BlogService {
  constructor(
    private authService: AuthService,
    private userService: UserService
  ) {}
  private createdBlogs: Blog[] = [];

  private isBlogFormVisible: boolean = false;

  showBlogFormSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    this.isBlogFormVisible
  );

  private blogs: Blog[] = this.getAllBlog();

  blogSubject: BehaviorSubject<Blog[]> = new BehaviorSubject<Blog[]>(
    this.blogs
  );

  addBlog(formGroup: FormGroup) {
    const { title, tags, blogImage, description } = formGroup.value;
    const blogCreator = this.authService.loggedInUser;

    const newBlog: Blog = {
      blogId: this.getBlogId(),
      blogTitle: title,
      tags,
      blogImage,
      description,
      bloggrUserName: blogCreator?.userName,
      bloggerUserId: blogCreator?.id,
      createdAt: new Date().toISOString(),
    };

    this.createdBlogs.unshift(newBlog);

    const allBlog = this.getAllBlog();
    this.blogSubject.next(allBlog);
  }

  hideShowBlogForm() {
    this.isBlogFormVisible = !this.isBlogFormVisible;
    this.showBlogFormSubject.next(this.isBlogFormVisible);
  }

  private getBlogId() {
    const maxId = this.createdBlogs.reduce(
      (maxId, blog) => Math.max(blog.blogId, maxId),
      0
    );
    return maxId + 1;
  }

  private getAllBlog() {
    return this.createdBlogs?.map((currentBlog) => {
      const desiredUser = this.userService.users?.find((user) => {
        return (
          currentBlog.bloggerUserId === user.id &&
          currentBlog.bloggrUserName === user.userName
        );
      });

      const {
        blogId,
        blogImage,
        blogTitle,
        bloggerUserId,
        description,
        bloggrUserName,
        tags,
        createdAt,
      } = currentBlog;

      const blog: Blog = {
        blogId,
        blogImage,
        blogTitle,
        description,
        tags,
        bloggerName: desiredUser?.firstName + ' ' + desiredUser?.lastName,
        bloggerUserId,
        bloggrUserName,
        bloggerImage: desiredUser?.image,
        createdAt,
      };

      return blog;
    });
  }
}
