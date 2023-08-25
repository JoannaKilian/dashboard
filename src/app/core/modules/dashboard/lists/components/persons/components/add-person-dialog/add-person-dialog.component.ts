import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { EntityCategory } from 'src/app/core/models/category-list.models';
import { Person } from 'src/app/core/models/person.models';
import { AlertService } from 'src/app/core/services/alert.service';
import { PersonsService } from 'src/app/core/services/persons.service';
import { TimeAlertService } from 'src/app/core/services/time-alert.service';

@Component({
  selector: 'app-add-person-dialog',
  templateUrl: './add-person-dialog.component.html',
  styleUrls: ['./add-person-dialog.component.scss']
})
export class AddPersonDialogComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<AddPersonDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public dialogData: any,
    private dataService: PersonsService,
    private timeAlertService: TimeAlertService,
  ) { }

  title: EntityCategory;
  alertService: AlertService;
  newItem: Person;

  ngOnInit() {
    this.title = this.dialogData.title;
    this.alertService = this.dialogData.alertService;
  }

  addHandler(item: Person) {

    const id: string = this.dataService.addUniqueId();
    item.id = id;
    this.newItem = item

    const birthdayDate = this.timeAlertService.getDaysToAnniversary(item.dateOfBirth);
    this.checkTimeAlert(birthdayDate, 'Birthday');

    if(item.nameDay){
      const nameDay = this.timeAlertService.getDaysToAnniversary(item.nameDay);
      this.checkTimeAlert(nameDay, 'Name Day');
    }

    this.dataService.add(this.newItem);
  }

  checkTimeAlert(expirationDate: number, name: string): void {
    if (expirationDate <= 30) {
      this.alertService.addAlert(this.title, this.newItem.id, this.newItem.name, this.newItem.surname, expirationDate, name);
    }
  }
}
