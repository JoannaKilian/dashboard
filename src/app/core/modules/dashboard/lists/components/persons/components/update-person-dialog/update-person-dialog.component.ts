import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { EntityCategory } from 'src/app/core/models/category-list.models';
import { Person } from 'src/app/core/models/person.models';
import { AlertService } from 'src/app/core/services/alert.service';
import { PersonsService } from 'src/app/core/services/persons.service';
import { TimeAlertService } from 'src/app/core/services/time-alert.service';

@Component({
  selector: 'app-update-person-dialog',
  templateUrl: './update-person-dialog.component.html',
  styleUrls: ['./update-person-dialog.component.scss']
})
export class UpdatePersonDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<UpdatePersonDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public dialogData: any,
    private dataService: PersonsService,
    private timeAlertService: TimeAlertService,
  ) { }

  title: EntityCategory;
  person: Person;
  alertService: AlertService;

  ngOnInit() {
    this.title = this.dialogData.title;
    this.person = this.dialogData.person;
    this.alertService = this.dialogData.alertService;
  }

  updateHandler(updateItem: Person) {
    updateItem.id = this.person.id;
    const birthdayDate = this.timeAlertService.getDaysToAnniversary(updateItem.dateOfBirth);
    this.updateTimeAlert(birthdayDate, 'Birthday', updateItem);
    if (updateItem.nameDay) {
      const nameDay = this.timeAlertService.getDaysToAnniversary(updateItem.nameDay);
      this.updateTimeAlert(nameDay, 'Name Day', updateItem);
    }
    this.dataService.update(updateItem);
  }

  updateTimeAlert(expirationDate: number, name: string, item: Person): void {
    if (expirationDate <= 30) {
      this.alertService.updateAlert(this.title, this.person.id, item.name, item.surname, expirationDate, name);
    } else {
      this.alertService.deleteAlertByItem(this.title, this.person.id, name);
    }
  }
}
