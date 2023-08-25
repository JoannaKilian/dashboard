import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { EntityCategory } from 'src/app/core/models/category-list.models';
import { Pet } from 'src/app/core/models/pet.models';
import { AlertService } from 'src/app/core/services/alert.service';
import { PetsService } from 'src/app/core/services/pets.service';
import { TimeAlertService } from 'src/app/core/services/time-alert.service';


@Component({
  selector: 'app-add-pet-dialog',
  templateUrl: './add-pet-dialog.component.html',
  styleUrls: ['./add-pet-dialog.component.scss']
})
export class AddPetDialogComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<AddPetDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public dialogData: any,
    private dataService: PetsService,
    private timeAlertService: TimeAlertService,
  ) { }

  title: EntityCategory;
  alertService: AlertService;
  newItem: Pet;

  ngOnInit() {
    this.title = this.dialogData.title;
    this.alertService = this.dialogData.alertService;
  }

  addHandler(item: Pet) {

    const id: string = this.dataService.addUniqueId();
    item.id = id;
    this.newItem = item

    const birthdayDate = this.timeAlertService.getDaysToAnniversary(item.dateOfBirth);
    this.checkTimeAlert(birthdayDate, 'Birthday');
    if(item.vaccinationDate){
      const vaccinationDate = this.timeAlertService.getCountEndTime(item.vaccinationDate);
      this.checkTimeAlert(vaccinationDate, 'Vaccination Date');
    }

    this.dataService.add(this.newItem);
  }

  checkTimeAlert(expirationDate: number, name: string): void {
    if (expirationDate <= 30) {
      this.alertService.addAlert(this.title, this.newItem.id, this.newItem.species, this.newItem.name, expirationDate, name);
    }
  }
}
