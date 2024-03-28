import { Component, OnDestroy, OnInit } from '@angular/core';
import { BlogService } from '../Services/blog.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

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

  constructor(
    private blogService: BlogService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const isBlogEdited = this.activatedRoute.snapshot.queryParams['edit'];
    const editedBlogId: string = this.activatedRoute.snapshot.queryParams['id'];

    this.blogFormVisibilityObserver =
      this.blogService.showBlogFormSubject.subscribe(
        (value) => (this.isBlogFormVisible = value)
      );

    this.userEditFormVisibilityObserver =
      this.blogService.showUserEditForm.subscribe(
        (value) => (this.isUserEditFormVisible = value)
      );

    if (isBlogEdited !== undefined && editedBlogId) {
      this.blogService.showBlogFormSubject.next(true);
    } else {
      this.blogService.showBlogFormSubject.next(false);
    }
  }
  ngOnDestroy(): void {
    this.blogFormVisibilityObserver.unsubscribe();
    this.userEditFormVisibilityObserver.unsubscribe();
  }
}
