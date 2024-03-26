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
}
