import { Component, Input } from '@angular/core';
import { Blog } from '../blog';
import { DUMMY_USER_IMAGE } from '../constants';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss'],
})
export class BlogComponent {
  @Input() blog!: Blog;

  userImage: string = this.blog?.bloggerImage
    ? this.blog.bloggerImage
    : DUMMY_USER_IMAGE;
}
