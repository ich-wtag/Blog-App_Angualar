import {
  AfterViewChecked,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BlogService } from '../Services/blog.service';
import { Blog } from '../Models/blog';
import { DUMMY_USER_IMAGE } from '../Models/constants';
import { AuthService } from '../Services/auth.service';

@Component({
  selector: 'app-blog-details',
  templateUrl: './blog-details.component.html',
  styleUrls: ['./blog-details.component.scss'],
})
export class BlogDetailsComponent implements OnInit, AfterViewChecked {
  dummyUserImage: string = DUMMY_USER_IMAGE;
  selectedBlog?: Blog;
  creatorImage!: string;
  isEditable: boolean = false;
  selectedBlogId!: string;

  @ViewChild('descriptionRef') descriptionElement!: ElementRef;
  constructor(
    private activatedRoute: ActivatedRoute,
    private blogService: BlogService,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.selectedBlogId = this.activatedRoute.snapshot.params['id'];

    if (this.selectedBlogId !== undefined) {
      this.blogService.blogSubject.subscribe((blogs) => {
        this.selectedBlog = blogs.find(
          (blog) => blog.blogId === this.selectedBlogId
        );

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

  ngAfterViewChecked(): void {
    if (this.descriptionElement !== undefined) {
      this.descriptionElement.nativeElement.innerHTML =
        this.selectedBlog?.description;
    }
  }

  handleEditClicked() {
    this.blogService.showBlogFormSubject.next(true);
    this.router.navigate(['/me'], {
      queryParams: { edit: true, id: this.selectedBlogId },
    });
  }
}
