import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UpdatePersonDialogComponent } from '../update-person-dialog/update-person-dialog.component';
import { MatDialogRef } from '@angular/material/dialog';
import { FormConfig } from 'src/app/core/models/form-config.models';
import { Person } from 'src/app/core/models/person.models';
import { PersonsService } from 'src/app/core/services/persons.service';
import { EntityCategory } from 'src/app/core/models/category-list.models';

@Component({
  selector: 'app-person-form',
  templateUrl: './person-form.component.html',
  styleUrls: ['./person-form.component.scss']
})
export class PersonFormComponent implements OnInit {

  @Input() data: Person;
  @Input() title: EntityCategory;
  @Output() submitFormEvent: EventEmitter<Person> = new EventEmitter();

  formFields: FormConfig[];

  constructor(
    public dialogRef: MatDialogRef<UpdatePersonDialogComponent>,
    private dataService: PersonsService
  ) { }

  ngOnInit(): void {
    this.formFields = this.dataService.getFormFields();
  }

  closeHandler(): void {
    this.dialogRef.close();
  }

  submitHandler(formValue: Person) {
    this.submitFormEvent.emit(formValue);
  }
}
