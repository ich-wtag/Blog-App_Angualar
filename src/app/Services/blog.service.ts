import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BehaviorSubject, map } from 'rxjs';
import { AuthService } from './auth.service';
import { UserService } from './user.service';
import { Blog } from '../Models/blog';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class BlogService {
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
    ''
  );

  blogSubject: BehaviorSubject<Blog[]> = new BehaviorSubject<Blog[]>([]);
  blogErrorSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private httpClient: HttpClient
  ) {}

  getAllBlogsFromDb() {
    return this.httpClient
      .get<{ [key: string]: Blog }>(
        'https://blog-angular-a0e04-default-rtdb.asia-southeast1.firebasedatabase.app/blog.json'
      )
      .pipe(
        map((responseData) => {
          let blogs: Blog[] = [];

          for (let key in responseData) {
            if (responseData.hasOwnProperty(key)) {
              blogs.unshift({ blogId: key, ...responseData[key] });
            }
          }

          return blogs;
        })
      )
      .subscribe({
        next: (blogs) => {
          this.createdBlogs = blogs;
          this.getAllBlog();
          this.blogErrorSubject.next(false);
        },
        error: (err) => {
          this.blogErrorSubject.next(true);
        },
      });
  }

  getSingleBlog(id: string) {
    return this.httpClient.get<Blog>(
      'https://blog-angular-a0e04-default-rtdb.asia-southeast1.firebasedatabase.app/blog/' +
        id +
        '.json'
    );
  }

  addBlog(formGroup: FormGroup, blogImageFileName: string) {
    const { title, tags, blogImage, description } = formGroup.value;
    const blogCreator = this.authService.loggedInUser;

    const newBlog: Blog = {
      blogTitle: title,
      blogImageFileName,
      tags,
      blogImage,
      description,
      bloggrUserName: blogCreator?.userName,
      bloggerUserId: blogCreator?.id,
      createdAt: new Date().toISOString(),
    };

    this.httpClient
      .post<{ id: string }>(
        'https://blog-angular-a0e04-default-rtdb.asia-southeast1.firebasedatabase.app/blog.json',
        newBlog
      )
      .subscribe((data) => {
        newBlog.blogId = data.id;

        this.createdBlogs.unshift(newBlog);
        this.getAllBlog();
      });
  }

  hideShowBlogForm() {
    this.isBlogFormVisible = !this.isBlogFormVisible;
    this.showBlogFormSubject.next(this.isBlogFormVisible);
  }

  updateBlog(
    blogId: string,
    formGroup: FormGroup,
    blogImageFileName: string,
    editedBlog: Blog
  ) {
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

    const data: Blog = {
      ...editedBlog,
      blogTitle: title,
      blogImage,
      blogImageFileName,
      tags,
      description,
    };
    this.getAllBlog();

    return this.httpClient.put(
      'https://blog-angular-a0e04-default-rtdb.asia-southeast1.firebasedatabase.app/blog/' +
        blogId +
        '.json',
      data
    );
  }

  toggleUserEditForm() {
    this.isUserEditFormVisible = !this.isUserEditFormVisible;
    this.showUserEditForm.next(this.isUserEditFormVisible);
  }

  updateBlogWithUser() {
    this.getAllBlog();
  }

  private getAllBlog() {
    const allBlogs = this.createdBlogs.map((blog) => {
      const desiredUser = this.userService.users?.find((user) => {
        return (
          blog.bloggerUserId === user.id &&
          blog.bloggrUserName === user.userName
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
      } = blog;
      const completeBlogInfo: Blog = {
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
      return completeBlogInfo;
    });

    this.blogSubject.next(allBlogs);
  }
}
