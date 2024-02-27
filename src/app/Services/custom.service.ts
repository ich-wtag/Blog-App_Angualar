import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CustomService {
  hideShowDropdown: Subject<boolean> = new Subject();

  hideDropdown() {
    this.hideShowDropdown.next(false);
  }
  showDropdown() {
    this.hideShowDropdown.next(true);
  }
}
