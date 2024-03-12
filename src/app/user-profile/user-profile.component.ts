import { Component, OnDestroy, OnInit } from '@angular/core';
import { BlogService } from '../Services/blog.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit, OnDestroy {
  isBlogFormVisible: boolean = false;
  blogFormObserver!: Subscription;
  blogFormVisibilityObserver!: Subscription;

  constructor(private blogService: BlogService) {}

  ngOnInit(): void {
    this.blogFormVisibilityObserver = this.blogFormObserver =
      this.blogService.showBlogFormSubject.subscribe(
        (value) => (this.isBlogFormVisible = value)
      );
  }
  ngOnDestroy(): void {
    this.blogFormVisibilityObserver.unsubscribe();
  }
}
