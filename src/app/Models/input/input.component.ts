import { Component, Input, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
})
export class InputComponent {
  @Input('label') label?: string;
  @Input('placeholder') placeholder?: string;
  @Input() className?: string;
  @Input('type') type?: 'text' | 'password' | 'email' | 'number';
  @Input() control = new FormControl();
}
