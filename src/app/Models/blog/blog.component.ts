import { Component, Input, OnInit } from '@angular/core';
import { Blog } from '../blog';
import { DUMMYUSERIMAGE } from '../constants';
import { getId } from '../commonFunctions';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss'],
})
export class BlogComponent implements OnInit {
  @Input() blog!: Blog;

  dummyUSerImage: string = DUMMYUSERIMAGE;
  getBlogId = getId;
  creatorImage!: string;

  ngOnInit(): void {
    this.creatorImage = this.blog.bloggerImage
      ? this.blog.bloggerImage
      : this.dummyUSerImage;
  }
}
