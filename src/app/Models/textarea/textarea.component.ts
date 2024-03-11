import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-textarea',
  templateUrl: './textarea.component.html',
  styleUrls: ['./textarea.component.scss'],
})
export class TextareaComponent implements OnInit {
  @Input() label?: string;
  @Input() placeholder?: string;
  @Input() wrapperClassName?: string;
  @Input() className?: string;
  @Input() control = new FormControl();
  @Input() isEditable: boolean = false;

  placeHolderMessage: string = '';

  ngOnInit(): void {
    this.placeHolderMessage = this.placeholder?.length ? this.placeholder : '';
  }
}
