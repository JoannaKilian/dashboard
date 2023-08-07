import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormConfig } from 'src/app/core/models/form-config.models';

@Component({
  selector: 'app-form-control',
  templateUrl: './form-control.component.html',
  styleUrls: ['./form-control.component.scss']
})
export class FormControlComponent {
  
  @Input() field: FormConfig;
  @Input() form: FormGroup;
}
