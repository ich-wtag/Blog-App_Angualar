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
  blogFormVisibilityObserver!: Subscription;
  isUserEditFormVisible: boolean = false;
  userEditFormVisibilityObserver!: Subscription;

  constructor(private blogService: BlogService) {}

  ngOnInit(): void {
    this.blogFormVisibilityObserver =
      this.blogService.showBlogFormSubject.subscribe(
        (value) => (this.isBlogFormVisible = value)
      );

    this.userEditFormVisibilityObserver =
      this.blogService.showUserEditForm.subscribe(
        (value) => (this.isUserEditFormVisible = value)
      );
  }
  ngOnDestroy(): void {
    this.blogFormVisibilityObserver.unsubscribe();
    this.userEditFormVisibilityObserver.unsubscribe();
  }
}
