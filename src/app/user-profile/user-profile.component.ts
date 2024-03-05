import { Component } from '@angular/core';
import { BlogService } from '../Services/blog.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent {
  constructor(
    private blogService: BlogService,
    private activatedRoute: ActivatedRoute
  ) {}

  editBlogId?: number;
  isBlogEdited: boolean = false;

  isBlogFormVisible: boolean = false;

  ngOnInit(): void {
    this.blogService.showBlogFormSubject.subscribe(
      (value) => (this.isBlogFormVisible = value)
    );

    (this.editBlogId = this.activatedRoute.snapshot.queryParams['id']),
      (this.isBlogEdited = this.activatedRoute.snapshot.queryParams['edit']);

    if (this.isBlogEdited && this.editBlogId) {
      this.isBlogFormVisible = true;
    }
  }
}
