import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, debounceTime } from 'rxjs';
import { Blog } from 'src/app/Models/blog';
import { BLOG_TAGS } from 'src/app/Models/constants';
import { BlogService } from 'src/app/Services/blog.service';

@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.scss'],
})
export class BlogListComponent implements OnInit, OnDestroy {
  blogs: Blog[] = [];
  seacrhedBlogs: Blog[] = [];
  filteredBlogs: Blog[] = [];
  filteredTags: string[] = [];
  blogObserverVer!: Subscription;
  searchedBlogObserver!: Subscription;
  blogTags = JSON.parse(JSON.stringify(BLOG_TAGS));

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

        this.filterByTags();
      });
  }

  ngOnDestroy(): void {
    this.blogObserverVer.unsubscribe();
    this.searchedBlogObserver.unsubscribe();
  }

  getFilteredTags($event: string) {
    this.filteredTags.push($event);
    this.filterByTags();
  }

  removeFilteredTag($event: string) {
    const indexOfTag = this.filteredTags.indexOf($event);
    this.filteredTags.splice(indexOfTag, 1);
    this.filterByTags();
  }

  filterByTags() {
    this.filteredBlogs = this.seacrhedBlogs.filter((blog) => {
      if (this.filteredTags.length > 0) {
        return this.filteredTags.some((tag) => blog.tags.includes(tag));
      }
      return true;
    });
  }
}
