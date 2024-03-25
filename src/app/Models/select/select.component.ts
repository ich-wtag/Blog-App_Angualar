import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { BLOG_TAGS } from '../constants';
import { Router } from '@angular/router';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
})
export class SelectComponent implements OnChanges {
  @Input() label?: string;
  @Input() placeholder?: string;
  @Input() wrapperClassName?: string;
  @Input() className?: string;
  @Input() control = new FormControl();
  @Input() availableTags: string[] = [];
  @Input() selectedTags: string[] = [];
  @Input() tagsFromEditedBlog: string[] = [];
  @Input() isFilterCase: boolean = false;

  @Output() OnSelectedTags: EventEmitter<string> = new EventEmitter<string>();
  @Output() OnUnSelectTag: EventEmitter<number> = new EventEmitter<number>();
  @Output() OnUnSelectFilterTags: EventEmitter<string> =
    new EventEmitter<string>();

  @ViewChild('dropdownArrow') dropDownElem?: ElementRef;

  isDropdownVisible: boolean = false;
  blogTags: string[] = BLOG_TAGS;

  constructor(private router: Router) {}

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
    const adjustLength: number = this.isFilterCase ? 0 : 1;
    if (
      !this.selectedTags.includes(value) &&
      this.availableTags.length > adjustLength
    ) {
      this.selectedTags.push(value);
      this.availableTags.splice(index, 1);

      this.isFilterCase
        ? this.onUnSelectFilteredTag(value)
        : this.onUnSelectTag(index);
    } else if (this.selectedTags.length === 0) {
      this.hideDropdown();
    }
  }

  onSelectedTags(tag: string) {
    this.OnSelectedTags.emit(tag);
  }

  onUnSelectTag(index: number) {
    this.OnUnSelectTag.emit(index);
  }

  onUnSelectFilteredTag(tag: string) {
    this.OnUnSelectFilterTags.emit(tag);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes?.['tagsFromEditedBlog']?.currentValue !== undefined) {
      this.selectedTags = this.tagsFromEditedBlog;
    }
  }
}
