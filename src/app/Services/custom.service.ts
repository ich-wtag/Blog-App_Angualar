import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { BLOGTAGS } from '../Models/constants';

@Injectable({
  providedIn: 'root',
})
export class CustomService {
  blogArrays = BLOGTAGS;

  blogTagsArray: BehaviorSubject<string[]> = new BehaviorSubject(
    this.blogArrays
  );

  setBlogsArray(blogs: string[]) {
    this.blogTagsArray.next(blogs);
  }
}
