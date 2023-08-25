import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FormConfig } from 'src/app/core/models/form-config.models';

@Component({
  selector: 'app-create-form',
  templateUrl: './create-form.component.html',
  styleUrls: ['./create-form.component.scss']
})
export class CreateFormComponent implements OnInit {

  @Input() fields: FormConfig[] = [];
  @Input() data: any;
  @Output() submitEvent = new EventEmitter<any>();
  @Output() closeEvent = new EventEmitter<any>();

  form: FormGroup;
  invalid: boolean = false;

  constructor(private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({});
    this.registerForm()
  }

  registerForm() {
    const controlsConfig: { [key: string]: any[] } = {};
    for (const field of this.fields) {
      controlsConfig[field.name] = [this.data ? this.data[field.name] : '', field.validations || []]
    }
    this.form = this.formBuilder.group(controlsConfig);
  }


  onSubmit() {
    if (this.form.invalid) {
      this.invalid = true;
      this.form.markAllAsTouched;
      return;
    }

    this.submitEvent.emit(this.form.value);

    this.onCloseClick();
  }

  onCloseClick() {
    this.closeEvent.emit();
  }
}
