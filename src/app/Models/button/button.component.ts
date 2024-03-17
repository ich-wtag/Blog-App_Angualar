import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent {
  @Input() disabled?: boolean;
  @Input() className?: string;
  @Input() buttonType?: string;

  @Output() OnButtonClicked: EventEmitter<EventTarget> =
    new EventEmitter<EventTarget>();

  onButtonClicked(event: Event) {
    this.OnButtonClicked.emit(<EventTarget>event.target);
  }
}
