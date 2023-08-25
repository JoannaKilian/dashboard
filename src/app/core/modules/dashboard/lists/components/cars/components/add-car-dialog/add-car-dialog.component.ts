import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Car } from 'src/app/core/models/car.models';
import { EntityCategory } from 'src/app/core/models/category-list.models';
import { AlertService } from 'src/app/core/services/alert.service';
import { CarService } from 'src/app/core/services/cars.service';
import { TimeAlertService } from 'src/app/core/services/time-alert.service';

@Component({
  selector: 'app-add-car-dialog',
  templateUrl: './add-car-dialog.component.html',
  styleUrls: ['./add-car-dialog.component.scss']
})
export class AddCarDialogComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<AddCarDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public dialogData: any,
    private dataService: CarService,
    private timeAlertService: TimeAlertService,
  ) { }

  title: EntityCategory;
  alertService: AlertService;
  newItem: Car;

  ngOnInit() {
    this.title = this.dialogData.title;
    this.alertService = this.dialogData.alertService;
  }

  addHandler(item: Car) {

    const id: string = this.dataService.addUniqueId();
    item.id = id;
    this.newItem = item

    const inspectionDate = this.timeAlertService.getCountEndTime(item.carInspection);
    const insuranceDate = this.timeAlertService.getCountEndTime(item.insuranceDate);
    this.checkTimeAlert(inspectionDate, 'Inspection');
    this.checkTimeAlert(insuranceDate, 'Insurance');
    this.dataService.add(this.newItem);
  }

  checkTimeAlert(expirationDate: number, name: string): void {
    if (expirationDate <= 30) {
      this.alertService.addAlert(this.title, this.newItem.id, this.newItem.brand, this.newItem.model, expirationDate, name);
    }
  }
}
