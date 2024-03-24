import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BlogService } from '../Services/blog.service';
import { Blog } from '../Models/blog';
import { DUMMY_USER_IMAGE } from '../Models/constants';
import { Subscription } from 'rxjs';
import { AuthService } from '../Services/auth.service';

@Component({
  selector: 'app-blog-details',
  templateUrl: './blog-details.component.html',
  styleUrls: ['./blog-details.component.scss'],
})
export class BlogDetailsComponent implements OnInit {
  dummyUserImage: string = DUMMY_USER_IMAGE;
  selectedBlog?: Blog;
  creatorImage!: string;
  isEditable: boolean = false;

  @ViewChild('descriptionRef') descriptionElement!: ElementRef;
  constructor(
    private activatedRoute: ActivatedRoute,
    private blogService: BlogService,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    const selectedBlogId: string = this.activatedRoute.snapshot.params['id'];

    if (selectedBlogId !== undefined) {
      this.blogService.getSingleBlog(selectedBlogId).subscribe((data) => {
        this.selectedBlog = <Blog>data;

        if (this.descriptionElement !== undefined) {
          this.descriptionElement.nativeElement.innerHTML =
            this.selectedBlog?.description;
        }

        this.isEditable =
          this.authService.loggedInUser?.id ===
            this.selectedBlog?.bloggerUserId &&
          this.authService.loggedInUser?.userName ===
            this.selectedBlog?.bloggrUserName;

        this.creatorImage = this.selectedBlog?.bloggerImage
          ? this.selectedBlog?.bloggerImage
          : this.dummyUserImage;
      });
    }

    this.blogService.hideShowBlogForm();
  }

  handleEditClicked() {
    this.blogService.showBlogFormSubject.next(true);
    this.router.navigate(['/me'], {
      queryParams: { edit: true, id: this.selectedBlog?.blogId },
    });
  }
}
