import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
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

  @ViewChild('loadMoreButtonText') loadMoreButton!: ElementRef;
  constructor(private blogService: BlogService) {}

  getFilteredTags($event: string) {
    this.filteredTags.push($event);
    this.filterByTags();
  }

  removeFilteredTag($event: string) {
    const indexOfTag = this.filteredTags.indexOf($event);
    this.filteredTags.splice(indexOfTag, 1);
    this.filterByTags();
  }

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

  filterByTags() {
    this.filteredBlogs = this.seacrhedBlogs.filter((blog) => {
      if (this.filteredTags.length > 0) {
        return this.filteredTags.some((tag) => blog.tags.includes(tag));
      }
      return true;
    });

    this.loadMoreBlogs();
  }

  handleLoadMoreBlogs($event: EventTarget) {
    const loadBlogsNumber = 6;
    const buttonElement = <HTMLElement>$event;

    if (this.endIndex < this.filteredBlogs.length) {
      this.endIndex += loadBlogsNumber;
    } else {
      this.endIndex = 9;
    }

    buttonElement.innerText =
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
