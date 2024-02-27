import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
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
export class SelectComponent {
  isDropdownVisible: boolean = false;
  availableTags: string[] = BLOGTAGS;
  selectedTags: string[] = [];

  @Input() label?: string;
  @Input() placeholder?: string;
  @Input() wrapperClassName?: string;
  @Input() className?: string;
  @Input() control = new FormControl();

  @ViewChild('dropdownArrow') dropDownElem?: ElementRef;

  @Output() SelectedTags: EventEmitter<string> = new EventEmitter<string>();
  @Output() UnSelectTag: EventEmitter<number> = new EventEmitter<number>();

  dropDownClicked() {
    if (this.isDropdownVisible) {
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
    }

    // this.onSelectedTags(this.selectedTags);
  }

  cancelButtonClicked(value: string, index: number) {
    if (!this.selectedTags.includes(value)) {
      this.selectedTags.push(value);
      this.availableTags.splice(index, 1);
      this.onUnSelectTag(index);
    }
  }

  onSelectedTags(tag: string) {
    this.SelectedTags.emit(tag);
  }

  onUnSelectTag(index: number) {
    this.UnSelectTag.emit(index);
  }
}
