import { Component, Input } from '@angular/core';
import { Car } from 'src/app/core/models/car.models';
import { UpdateCarDialogComponent } from '../update-car-dialog/update-car-dialog.component';
import { MatDialogRef } from '@angular/material/dialog';
import { FieldType, FormConfig } from 'src/app/core/models/form-config.models';
import { Validators } from '@angular/forms';
import { CarService } from 'src/app/core/store/car/car.service';

@Component({
  selector: 'app-car-form',
  templateUrl: './car-form.component.html',
  styleUrls: ['./car-form.component.scss']
})
export class CarFormComponent {
  @Input() car: Car;

  formFields: FormConfig[] = [
    {
      type: FieldType.Select, label: 'Brand', name: 'brand', options: [
        'Toyota',
        'Volkswagen',
        'Ford',
        'Honda',
        'Chevrolet',
        'Nissan',
        'Hyundai',
        'BMW'
      ], validations: [Validators.required]
    },
    { type: FieldType.Text, label: 'Model', name: 'model' },
    { type: FieldType.Number, label: 'Production Year', name: 'productionYear' },
    {
      type: FieldType.Select, label: 'Color', name: 'color', options: [
        'Red',
        'Blue',
        'Green',
        'Black',
        'White',
        'Yellow',
        'Silver',
        'Gray'
      ]
    },
    { type: FieldType.Date, label: 'Insurance Date', name: 'insuranceDate', validations: [Validators.required] },
    { type: FieldType.Number, label: 'Engine Capacity', name: 'engineCapacity' },
    { type: FieldType.Number, label: 'Engine Power', name: 'enginePower' },
  ];

  constructor(
    public dialogRef: MatDialogRef<UpdateCarDialogComponent>,
    private carService: CarService
  ) { }

  closeHandler(): void {
    this.dialogRef.close();
  }

  submitHandler(formValue: Car) {
    this.carService.addCar(formValue)
  }

  genderOptions = [
    { label: 'Male', value: 'male' },
    { label: 'Female', value: 'female' },
    { label: 'Other', value: 'other' },
  ];
}
