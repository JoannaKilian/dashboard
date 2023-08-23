import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Car } from 'src/app/core/models/car.models';
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
    private carService: CarService,
    private timeAlertService: TimeAlertService,
  ) { }

  alertService: AlertService;
  newCar: Car;

  ngOnInit() {
    this.alertService = this.dialogData.alertService;
  }

  addCarHandler(car: Car) {

    const id: string = this.carService.addCarUniqueId();
    car.id = id;
    this.newCar = car

    const inspectionDate = this.timeAlertService.getCountEndTime(car.carInspection);
    const insuranceDate = this.timeAlertService.getCountEndTime(car.insuranceDate);
    this.checkTimeAlert(inspectionDate, 'Inspection');
    this.checkTimeAlert(insuranceDate, 'Insurance');
    this.carService.addNewCar(this.newCar);
  }

  checkTimeAlert(expirationDate: number, name: string): void {
    if (expirationDate <= 30) {
      this.alertService.addAlert('cars', this.newCar.id, this.newCar.brand, this.newCar.model, expirationDate, name);
    }
  }
}