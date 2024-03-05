import { Component, Input, OnInit } from '@angular/core';
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

  placeHolderMessage: string = '';

  ngOnInit(): void {
    this.placeHolderMessage = this.placeholder?.length ? this.placeholder : '';
  }
}
