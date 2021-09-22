import { FormGroup } from '@angular/forms';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent {
  @Input() placeHolder: string = '';
  @Input() typeInput: string = '';
  @Input() classInput: string = '';

  // @ts-ignore
  @Input() form: FormGroup;

  constructor() { }
}
