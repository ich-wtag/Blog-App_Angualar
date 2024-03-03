import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BlogService } from '../Services/blog.service';
import { Blog } from '../Models/blog';
import { DUMMYUSERIMAGE } from '../Models/constants';

@Component({
  selector: 'app-blog-details',
  templateUrl: './blog-details.component.html',
  styleUrls: ['./blog-details.component.scss'],
})
export class BlogDetailsComponent {
  dummyUserImage: string = DUMMYUSERIMAGE;
  selectedBlog?: Blog;

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
  }
}
