import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from './auth.service';
import { UserService } from './user.service';
import { Blog } from '../Models/blog';

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
  private isUserEditFormVisible: boolean = false;

  showBlogFormSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    this.isBlogFormVisible
  );

  showUserEditForm: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );

  searchedValueSubject: BehaviorSubject<string> = new BehaviorSubject<string>(
    ' '
  );

  private blogs: Blog[] = this.getAllBlog();

  blogSubject: BehaviorSubject<Blog[]> = new BehaviorSubject<Blog[]>(
    this.blogs
  );

  addBlog(formGroup: FormGroup, blogImageFileName: string) {
    const { title, tags, blogImage, description } = formGroup.value;
    const blogCreator = this.authService.loggedInUser;

    const newBlog: Blog = {
      blogId: this.getBlogId(),
      blogTitle: title,
      blogImageFileName,
      tags,
      blogImage,
      description,
      bloggrUserName: blogCreator?.userName,
      bloggerUserId: blogCreator?.id,
      createdAt: new Date().toISOString(),
    };

    this.createdBlogs.unshift(newBlog);

    localStorage.setItem('createdBlog', JSON.stringify(this.createdBlogs));

    const allBlog = this.getAllBlog();
    this.blogSubject.next(allBlog);
  }

  hideShowBlogForm() {
    this.isBlogFormVisible = !this.isBlogFormVisible;
    this.showBlogFormSubject.next(this.isBlogFormVisible);
  }

  updateBlog(blogId: number, formGroup: FormGroup, blogImageFileName: string) {
    const { title, tags, blogImage, description } = formGroup.value;
    this.createdBlogs = this.createdBlogs.map((blog) => {
      if (blog.blogId === blogId) {
        blog.blogTitle = title;
        blog.blogImage = blogImage;
        blog.blogImageFileName = blogImageFileName;
        blog.description = description;
        blog.tags = tags;
      }
      return blog;
    });

    localStorage.setItem('createdBlog', JSON.stringify(this.createdBlogs));

    const allBlog = this.getAllBlog();
    this.blogSubject.next(allBlog);
  }

  toggleUserEditForm() {
    this.isUserEditFormVisible = !this.isUserEditFormVisible;
    this.showUserEditForm.next(this.isUserEditFormVisible);
  }

  updateBlogWithUser() {
    const allBlog = this.getAllBlog();
    this.blogSubject.next(allBlog);
  }

  getBlogsFromLocalStorage() {
    const blogs = localStorage.getItem('createdBlog');

    if (blogs) {
      this.createdBlogs = JSON.parse(blogs);
    }

    const allBlog = this.getAllBlog();
    this.blogSubject.next(allBlog);
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
        blogImageFileName,
      } = currentBlog;

      const blog: Blog = {
        blogId,
        blogImage,
        blogImageFileName,
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
