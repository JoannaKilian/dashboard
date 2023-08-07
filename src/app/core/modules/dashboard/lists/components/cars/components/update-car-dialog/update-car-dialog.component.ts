import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Car } from 'src/app/core/models/car.models';
import { CarService } from 'src/app/core/services/cars.service';

@Component({
  selector: 'app-update-car-dialog',
  templateUrl: './update-car-dialog.component.html',
  styleUrls: ['./update-car-dialog.component.scss']
})
export class UpdateCarDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<UpdateCarDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public car: Car,
    private carService: CarService
  ) { }


  updateCarHandler(updateCar: Car) {
    updateCar.id = this.car.id
    this.carService.updateCar(updateCar);
  }
}
