import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, debounceTime } from 'rxjs';
import { Blog } from 'src/app/Models/blog';
import { BlogService } from 'src/app/Services/blog.service';

@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.scss'],
})
export class BlogListComponent implements OnInit, OnDestroy {
  blogs: Blog[] = [];
  seacrhedBlogs: Blog[] = [];
  blogObserverVer!: Subscription;
  searchedBlogObserver!: Subscription;

  constructor(private blogService: BlogService) {}

  ngOnInit(): void {
    this.blogObserverVer = this.blogService.blogSubject.subscribe(
      (data) => (this.blogs = data)
    );

    this.searchedBlogObserver = this.blogService.searchedValueSubject
      .pipe(debounceTime(600))
      .subscribe((searchValue) => {
        this.seacrhedBlogs = this.blogs.filter((blog) =>
          blog?.blogTitle.toLowerCase().includes(searchValue.toLowerCase())
        );
      });
  }

  ngOnDestroy(): void {
    this.blogObserverVer.unsubscribe();
    this.searchedBlogObserver.unsubscribe();
  }
}
