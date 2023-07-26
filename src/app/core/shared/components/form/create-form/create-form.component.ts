import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-create-form',
  templateUrl: './create-form.component.html',
  styleUrls: ['./create-form.component.scss']
})
export class CreateFormComponent {
  @Output() submitEvent = new EventEmitter<any>();

  onSubmit() {
    this.submitEvent.emit();
  }
}
