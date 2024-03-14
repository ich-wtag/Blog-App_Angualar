import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
})
export class InputComponent implements OnInit {
  @Input() label?: string;
  @Input() placeholder?: string;
  @Input() wrapperClassName?: string;
  @Input() className?: string;
  @Input() type?: 'text' | 'password' | 'email' | 'number' | 'file';
  @Input() control = new FormControl();
  @Input() inputFileWrapperClass?: string;
  @Input() selectableLabelClass?: string;
  @Input() isSearchInput: boolean = false;

  @Output() OnChangeEvent: EventEmitter<FileList | null> =
    new EventEmitter<FileList | null>();

  @Output() OnSearchValue: EventEmitter<string> = new EventEmitter<string>();

  placeHolderMessage: string = '';
  searchInputValue: string = '';

  ngOnInit(): void {
    this.placeHolderMessage = this.placeholder?.length ? this.placeholder : '';
  }

  onChangeImage(event: Event) {
    const file = (<HTMLInputElement>event.target)?.files;
    this.OnChangeEvent.emit(file);
  }

  onSearchHandler(event: Event) {
    const inputValue = (<HTMLInputElement>event.target).value;
    this.OnSearchValue.emit(inputValue);
  }
}
