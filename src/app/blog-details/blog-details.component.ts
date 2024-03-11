import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BlogService } from '../Services/blog.service';
import { Blog } from '../Models/blog';
import { DUMMY_USER_IMAGE } from '../Models/constants';

@Component({
  selector: 'app-blog-details',
  templateUrl: './blog-details.component.html',
  styleUrls: ['./blog-details.component.scss'],
})
export class BlogDetailsComponent implements OnInit, AfterViewInit {
  dummyUserImage: string = DUMMY_USER_IMAGE;
  selectedBlog?: Blog;
  creatorImage!: string;

  @ViewChild('descriptionRef') descriptionElement!: ElementRef;
  constructor(
    private activatedRoute: ActivatedRoute,
    private blogService: BlogService
  ) {}

  ngOnInit(): void {
    const selectedBlogId: number = Number(
      this.activatedRoute.snapshot.params['id']
    );

    this.blogService.blogSubject.subscribe((blogs) => {
      this.selectedBlog = blogs.find((blog) => blog.blogId === selectedBlogId);
    });

    this.creatorImage = this.selectedBlog?.bloggerImage
      ? this.selectedBlog?.bloggerImage
      : this.dummyUserImage;
  }

  ngAfterViewInit(): void {
    this.descriptionElement.nativeElement.innerHTML =
      this.selectedBlog?.description;
  }
}
