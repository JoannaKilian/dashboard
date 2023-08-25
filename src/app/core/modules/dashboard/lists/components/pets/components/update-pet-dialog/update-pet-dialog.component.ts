import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { EntityCategory } from 'src/app/core/models/category-list.models';
import { Pet } from 'src/app/core/models/pet.models';
import { AlertService } from 'src/app/core/services/alert.service';
import { PetsService } from 'src/app/core/services/pets.service';
import { TimeAlertService } from 'src/app/core/services/time-alert.service';

@Component({
  selector: 'app-update-pet-dialog',
  templateUrl: './update-pet-dialog.component.html',
  styleUrls: ['./update-pet-dialog.component.scss']
})
export class UpdatePetDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<UpdatePetDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public dialogData: any,
    private dataService: PetsService,
    private timeAlertService: TimeAlertService,
  ) { }

  title: EntityCategory;
  pet: Pet;
  alertService: AlertService;

  ngOnInit() {
    this.title = this.dialogData.title;
    this.pet = this.dialogData.pet;
    this.alertService = this.dialogData.alertService;
  }

  updateHandler(updateItem: Pet) {
    updateItem.id = this.pet.id;
    const birthdayDate = this.timeAlertService.getDaysToAnniversary(updateItem.dateOfBirth);
    this.updateTimeAlert(birthdayDate, 'Birthday', updateItem);
    if(updateItem.vaccinationDate){
      const vaccinationDate = this.timeAlertService.getCountEndTime(updateItem.vaccinationDate);
      this.updateTimeAlert(vaccinationDate, 'Vaccination Date', updateItem);
    }
    
    this.dataService.update(updateItem);
  }

  updateTimeAlert(expirationDate: number, name: string, item: Pet): void {
    if (expirationDate <= 30) {
      this.alertService.updateAlert(this.title, this.pet.id, item.species, item.name, expirationDate, name);
    } else {
      this.alertService.deleteAlertByItem(this.title, this.pet.id, name);
    }
  }
}
