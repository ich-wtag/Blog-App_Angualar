import { HtmlParser } from '@angular/compiler';
import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-textarea',
  templateUrl: './textarea.component.html',
  styleUrls: ['./textarea.component.scss'],
})
export class TextareaComponent {
  @Input() label?: string;
  @Input() placeholder?: string;
  @Input() wrapperClassName?: string;
  @Input() className?: string;
  @Input() control = new FormControl();
  @Input() isEditable: boolean = false;

  dataEdit!: HTMLElement;
  handleEditor(event: any) {
    console.log(event);
  }
}
