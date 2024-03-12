import { Component, Input, OnInit } from '@angular/core';
import { Blog } from '../blog';
import { DUMMY_USER_IMAGE } from '../constants';
import { getId } from '../commonFunctions';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss'],
})
export class BlogComponent implements OnInit {
  @Input() blog!: Blog;

  userImage: string = DUMMY_USER_IMAGE;
  getBlogId = getId;
  creatorImage!: string;

  ngOnInit(): void {
    this.creatorImage = this.userImage;
  }
}
