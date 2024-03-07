import { Component, OnDestroy, OnInit } from '@angular/core';
import { BlogService } from '../Services/blog.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit, OnDestroy {
  constructor(private blogService: BlogService) {}

  isBlogFormVisible: boolean = false;
  blogFormObserver!: Subscription;

  ngOnInit(): void {
    this.blogFormObserver = this.blogService.showBlogFormSubject.subscribe(
      (value) => (this.isBlogFormVisible = value)
    );
  }

  ngOnDestroy(): void {
    this.blogFormObserver.unsubscribe();
  }
}
