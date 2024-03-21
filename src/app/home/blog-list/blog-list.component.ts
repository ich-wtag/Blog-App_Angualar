import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  paginatedBlogs: Blog[] = [];
  filteredTags: string[] = [];
  blogObserverVer!: Subscription;
  searchedBlogObserver!: Subscription;
  blogTags = JSON.parse(JSON.stringify(BLOG_TAGS));
  isLoadMoreButtonVisible: boolean = false;
  endIndex: number = 9;
  loadMoreButtonText: string = 'Load More';
  searchedText: string = '';

  constructor(
    private blogService: BlogService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  getFilteredTags($event: string) {
    this.router.navigate(['home'], {
      queryParams: { filterTags: this.filteredTags },
      queryParamsHandling: 'merge',
    });
    this.filterByTags();
  }

  removeFilteredTag($event: string) {
    this.router.navigate(['home'], {
      queryParams: { filterTags: this.filteredTags },
      queryParamsHandling: 'merge',
    });
    this.filterByTags();
  }

  getFinalBlogsToShow() {
    this.activatedRoute.queryParams
      .pipe(debounceTime(500))
      .subscribe((data) => {
        const searchedString = data['searchedText'] || '';
        const tag = data['filterTags'] || [];

        if (typeof tag === 'string') {
          this.filteredTags.push(tag);
        } else {
          this.filteredTags = [...tag];
        }

        this.blogTags = this.blogTags.filter(
          (tag: string) => !this.filteredTags.includes(tag)
        );

        this.seacrhedBlogs = this.blogs.filter((blog) =>
          blog?.blogTitle.toLowerCase().includes(searchedString?.toLowerCase())
        );

        this.filterByTags();
      });
  }

  ngOnInit(): void {
    this.blogObserverVer = this.blogService.blogSubject.subscribe((data) => {
      this.blogs = data;
      this.getFinalBlogsToShow();
    });

    this.getFinalBlogsToShow();
  }

  ngOnDestroy(): void {
    this.blogObserverVer.unsubscribe();
  }

  filterByTags() {
    this.filteredBlogs = this.seacrhedBlogs.filter((blog) => {
      if (this.filteredTags.length > 0) {
        return this.filteredTags.some((tag) => blog.tags.includes(tag));
      }
      return true;
    });

    this.loadMoreBlogs();
  }

  handleLoadMoreBlogs() {
    const loadBlogsNumber = 6;

    if (this.endIndex < this.filteredBlogs.length) {
      this.endIndex += loadBlogsNumber;
    } else {
      this.endIndex = 9;
    }

    this.loadMoreButtonText =
      this.endIndex >= this.filteredBlogs.length ? 'Show Less' : 'Load More';

    this.loadMoreBlogs();
  }

  loadMoreBlogs() {
    if (this.filteredBlogs.length > 9) {
      this.isLoadMoreButtonVisible = true;
    } else {
      this.isLoadMoreButtonVisible = false;
    }
    this.paginatedBlogs = this.filteredBlogs.slice(0, this.endIndex);
  }
}
