import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Car } from 'src/app/core/models/car.models';
import { EntityCategory } from 'src/app/core/models/category-list.models';
import { AlertService } from 'src/app/core/services/alert.service';
import { CarService } from 'src/app/core/services/cars.service';
import { TimeAlertService } from 'src/app/core/services/time-alert.service';

@Component({
  selector: 'app-update-car-dialog',
  templateUrl: './update-car-dialog.component.html',
  styleUrls: ['./update-car-dialog.component.scss']
})
export class UpdateCarDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<UpdateCarDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public dialogData: any,
    private dataService: CarService,
    private timeAlertService: TimeAlertService,
  ) { }

  title: EntityCategory;
  car: Car;
  alertService: AlertService;

  ngOnInit() {
    this.title = this.dialogData.title;
    this.car = this.dialogData.car;
    this.alertService = this.dialogData.alertService;
  }

  updateHandler(updateItem: Car) {
    updateItem.id = this.car.id;
    const newInsuranceDate = this.timeAlertService.getCountEndTime(updateItem.insuranceDate);
    this.updateTimeAlert(newInsuranceDate, 'Insurance', updateItem);
    const newInspectionDate = this.timeAlertService.getCountEndTime(updateItem.carInspection);
    this.updateTimeAlert(newInspectionDate, 'Inspection', updateItem);

    this.dataService.update(updateItem);
  }

  updateTimeAlert(expirationDate: number, name: string, item: Car): void {
    if (expirationDate <= 30) {
      this.alertService.updateAlert(this.title, this.car.id, item.brand, item.model, expirationDate, name);
    } else {
      this.alertService.deleteAlertByItem(this.title, this.car.id, name);
    }
  }
}
