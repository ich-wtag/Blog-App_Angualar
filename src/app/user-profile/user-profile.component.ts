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
  constructor(
    private blogService: BlogService,
    private activatedRoute: ActivatedRoute
  ) {}

  editBlogId?: number;
  isBlogEdited: boolean = false;

  isBlogFormVisible: boolean = false;
  blogFormObserver!: Subscription;
  blogFormVisibilityObserver!: Subscription;

  ngOnInit(): void {
    this.blogFormVisibilityObserver = this.blogFormObserver =
      this.blogService.showBlogFormSubject.subscribe(
        (value) => (this.isBlogFormVisible = value)
      );

    const isBlogEdited = this.activatedRoute.snapshot.queryParams['edit'];
    const editedBlogId = Number(this.activatedRoute.snapshot.queryParams['id']);
    // if (!isBlogEdited && !editedBlogId) {
    //   this.blogService.showBlogFormSubject.next(false);
    // }
  }
  ngOnDestroy(): void {
    this.blogFormVisibilityObserver.unsubscribe();
  }
}
