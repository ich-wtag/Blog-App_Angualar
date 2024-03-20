import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
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
export class BlogDetailsComponent implements OnInit, AfterViewInit {
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
    const selectedBlogId: number = Number(
      this.activatedRoute.snapshot.params['id']
    );

    this.blogService.blogSubject.subscribe((blogs) => {
      // this.selectedBlog = blogs.find((blog) => blog.blogId === selectedBlogId);
    });

    this.creatorImage = this.selectedBlog?.bloggerImage
      ? this.selectedBlog?.bloggerImage
      : this.dummyUserImage;

    this.blogService.hideShowBlogForm();

    this.isEditable =
      this.authService.loggedInUser?.id === this.selectedBlog?.bloggerUserId &&
      this.authService.loggedInUser?.userName ===
        this.selectedBlog?.bloggrUserName;
  }

  ngAfterViewInit(): void {
    this.descriptionElement.nativeElement.innerHTML =
      this.selectedBlog?.description;
  }

  handleEditClicked() {
    this.blogService.showBlogFormSubject.next(true);
    this.router.navigate(['/me'], {
      queryParams: { edit: true, id: this.selectedBlog?.blogId },
    });
  }
}
