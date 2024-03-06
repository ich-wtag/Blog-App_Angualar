import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormControl } from '@angular/forms';

import { BLOGTAGS } from '../constants';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
})
export class SelectComponent implements OnInit {
  isDropdownVisible: boolean = false;
  selectedTags: string[] = [];

  @Input() label?: string;
  @Input() placeholder?: string;
  @Input() wrapperClassName?: string;
  @Input() className?: string;
  @Input() control = new FormControl();
  @Input() availableTags: string[] = [];
  @Input() tagsFromEditedBlog: string[] = [];

  @ViewChild('dropdownArrow') dropDownElem?: ElementRef;

  @Output() SelectedTags: EventEmitter<string> = new EventEmitter<string>();
  @Output() UnSelectTag: EventEmitter<number> = new EventEmitter<number>();

  dropDownClicked() {
    if (this.isDropdownVisible || this.selectedTags.length === 0) {
      this.hideDropdown();
    } else {
      this.dropDownElem?.nativeElement.classList.add('rotate');
      this.isDropdownVisible = true;
    }
  }

  hideDropdown() {
    this.dropDownElem?.nativeElement.classList.remove('rotate');
    this.isDropdownVisible = false;
  }

  optionClicked(value: string, index: number) {
    if (!this.availableTags.includes(value)) {
      this.availableTags.push(value);
      this.selectedTags.splice(index, 1);
      this.onSelectedTags(value);

      if (this.selectedTags.length === 0) {
        this.hideDropdown();
      }
    }
  }

  cancelButtonClicked(value: string, index: number) {
    if (!this.selectedTags.includes(value) && this.availableTags.length > 1) {
      this.selectedTags.push(value);
      this.availableTags.splice(index, 1);
      this.onUnSelectTag(index);
    } else if (this.selectedTags.length === 0) {
      this.hideDropdown();
    }
  }

  onSelectedTags(tag: string) {
    this.SelectedTags.emit(tag);
  }

  onUnSelectTag(index: number) {
    this.UnSelectTag.emit(index);
  }

  ngOnInit(): void {
    if (this.tagsFromEditedBlog.length) {
      this.selectedTags = this.tagsFromEditedBlog;
    }
  }
}
