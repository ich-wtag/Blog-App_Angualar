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

  placeHolderMessage: string = '';

  ngOnInit(): void {
    this.placeHolderMessage = this.placeholder?.length ? this.placeholder : '';
    console.log(this.isEditable);
  }
  @Input() isEditable: boolean = false;
}
