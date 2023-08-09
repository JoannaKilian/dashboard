import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Car } from 'src/app/core/models/car.models';
import { AlertService } from 'src/app/core/services/alert.service';
import { CarService } from 'src/app/core/services/cars.service';
import { TimeAlertService } from 'src/app/core/services/time-alert.service';

@Component({
  selector: 'app-update-car-dialog',
  templateUrl: './update-car-dialog.component.html',
  styleUrls: ['./update-car-dialog.component.scss']
})
export class UpdateCarDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<UpdateCarDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public car: Car,
    private carService: CarService,
    private alertService: AlertService,
    private timeAlertService: TimeAlertService,
  ) { }


  updateCarHandler(updateCar: Car) {
    updateCar.id = this.car.id;
    const newInsuranceDate = this.timeAlertService.getCountEndTime(updateCar.insuranceDate);
    this.updateTimeAlert(newInsuranceDate, 'Insurance', updateCar);
    const newInspectionDate = this.timeAlertService.getCountEndTime(updateCar.carInspection);
    this.updateTimeAlert(newInspectionDate, 'Inspection', updateCar);

    this.carService.updateCar(updateCar);
  }

  updateTimeAlert(expirationDate: number, name: string, updateCar: Car): void {
    if (expirationDate <= 30) {
      this.alertService.updateAlert('cars', this.car.id, updateCar.brand, updateCar.model, expirationDate, name);
      console.log(expirationDate, name);
    } else {
      this.alertService.deleteAlertByItem('cars', this.car.id, name)
    }
  }
}
