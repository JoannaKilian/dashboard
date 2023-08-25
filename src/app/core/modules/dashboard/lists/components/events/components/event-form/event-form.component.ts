import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormConfig } from 'src/app/core/models/form-config.models';
import { EntityCategory } from 'src/app/core/models/category-list.models';
import { CalendarEvent } from 'src/app/core/models/event.models';
import { EventsService } from 'src/app/core/services/events.service';
import { UpdateEventDialogComponent } from '../update-event-dialog/update-event-dialog.component';

@Component({
  selector: 'app-event-form',
  templateUrl: './event-form.component.html',
  styleUrls: ['./event-form.component.scss']
})
export class EventFormComponent implements OnInit {

  
  @Input() data: CalendarEvent;
  @Input() title: EntityCategory;
  @Output() submitFormEvent: EventEmitter<CalendarEvent> = new EventEmitter();

  formFields: FormConfig[];

  constructor(
    public dialogRef: MatDialogRef<UpdateEventDialogComponent>,
    private dataService: EventsService
  ) { }

  ngOnInit(): void {
    this.formFields = this.dataService.getFormFields();
  }

  closeHandler(): void {
    this.dialogRef.close();
  }

  submitHandler(formValue: CalendarEvent) {
    this.submitFormEvent.emit(formValue);
  }
}
