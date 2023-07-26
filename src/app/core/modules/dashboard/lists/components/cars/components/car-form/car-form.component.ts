import { Component, Input } from '@angular/core';
import { Car } from 'src/app/core/models/car.models';
import { UpdateCarDialogComponent } from '../update-car-dialog/update-car-dialog.component';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-car-form',
  templateUrl: './car-form.component.html',
  styleUrls: ['./car-form.component.scss']
})
export class CarFormComponent {
  @Input() car: Car;

  constructor(
    public dialogRef: MatDialogRef<UpdateCarDialogComponent>,
  ){}

  onNoClick(): void {
    this.dialogRef.close();
  }

  submitHandler(){

  }

  genderOptions = [
    { label: 'Male', value: 'male' },
    { label: 'Female', value: 'female' },
    { label: 'Other', value: 'other' },
  ];
}
