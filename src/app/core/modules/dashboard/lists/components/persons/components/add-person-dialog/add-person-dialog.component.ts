import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { EntityCategory } from 'src/app/core/models/category-list.models';
import { Person } from 'src/app/core/models/person.models';
import { PersonsService } from 'src/app/core/services/persons.service';

@Component({
  selector: 'app-add-person-dialog',
  templateUrl: './add-person-dialog.component.html',
  styleUrls: ['./add-person-dialog.component.scss']
})
export class AddPersonDialogComponent implements OnInit {

  title: EntityCategory;
  newItem: Person;

  constructor(
    public dialogRef: MatDialogRef<AddPersonDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public dialogData: any,
    private dataService: PersonsService,
  ) { }

  ngOnInit() {
    this.title = this.dialogData.title;
  }

  addHandler(item: Person) {
    const id: string = this.dataService.addUniqueId();
    item.id = id;
    this.newItem = item
    this.dataService.add(this.newItem);
  }
}
