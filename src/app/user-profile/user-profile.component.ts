import { Component } from '@angular/core';
import { BlogService } from '../Services/blog.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent {
  constructor(private blogService: BlogService) {}

  isBlogFormVisible: boolean = false;

  ngOnInit(): void {
    this.blogService.showBlogFormSubject.subscribe(
      (value) => (this.isBlogFormVisible = value)
    );
  }
}
