import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { EntityCategory } from 'src/app/core/models/category-list.models';
import { Person } from 'src/app/core/models/person.models';
import { PersonsService } from 'src/app/core/services/persons.service';

@Component({
  selector: 'app-update-person-dialog',
  templateUrl: './update-person-dialog.component.html',
  styleUrls: ['./update-person-dialog.component.scss']
})
export class UpdatePersonDialogComponent implements OnInit {

  title: EntityCategory;
  person: Person;

  constructor(
    public dialogRef: MatDialogRef<UpdatePersonDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public dialogData: any,
    private dataService: PersonsService,
  ) { }

  ngOnInit() {
    this.title = this.dialogData.title;
    this.person = this.dialogData.person;
  }

  updateHandler(updateItem: Person) {
    updateItem.id = this.person.id;
    this.dataService.update(updateItem);
  }
}
