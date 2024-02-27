import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
})
export class InputComponent {
  @Input() label?: string;
  @Input() placeholder?: string;
  @Input() wrapperClassName?: string;
  @Input() className?: string;
  @Input() type?: 'text' | 'password' | 'email' | 'number' | 'file';
  @Input() control = new FormControl();

  @Input() inputFileWrapperClass?: string;
  @Input() selectableLabelClass?: string;

  @Output() OnChangeEvent: EventEmitter<Event> = new EventEmitter<Event>();

  onChangeImage(event: Event) {
    this.OnChangeEvent.emit(event);
  }
}
