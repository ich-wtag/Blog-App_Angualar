import { Component, Input, OnInit } from '@angular/core';
import { Blog } from '../blog';
import { DUMMYUSERIMAGE } from '../constants';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss'],
})
export class BlogComponent {
  @Input() blog!: Blog;

  dummyUSerImage: string = DUMMYUSERIMAGE;
}
