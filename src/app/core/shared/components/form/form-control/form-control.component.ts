import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-form-control',
  templateUrl: './form-control.component.html',
  styleUrls: ['./form-control.component.scss']
})
export class FormControlComponent {
  
  @Input() label: string;
  @Input() formControl: string;
  @Input() type: string;
  @Input() options: { label: string; value: any }[] = [];

  control: FormControl = new FormControl();

}
