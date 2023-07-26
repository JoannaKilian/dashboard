import { Component, Input } from '@angular/core';
import { Car } from 'src/app/core/models/car.models';
import { UpdateCarDialogComponent } from '../update-car-dialog/update-car-dialog.component';
import { MatDialogRef } from '@angular/material/dialog';
import { FieldType, FormConfig } from 'src/app/core/models/form-config.models';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-car-form',
  templateUrl: './car-form.component.html',
  styleUrls: ['./car-form.component.scss']
})
export class CarFormComponent {
  @Input() car: Car;

  formFields: FormConfig[] = [
    { type: FieldType.Email, label: 'Email', name: 'email', validations: [Validators.required, Validators.email] },
    { type: FieldType.Password, label: 'Password', name: 'password', validations: [Validators.required] },
    { type: FieldType.Textarea, label: 'Description', name: 'description' },
    { type: FieldType.Select, label: 'Gender', name: 'gender', options: ['Male', 'Female', 'Other'], validations: [Validators.required] },
    { type: FieldType.Number, label: 'Age', name: 'age', validations: [Validators.required] },
  ];

  constructor(
    public dialogRef: MatDialogRef<UpdateCarDialogComponent>,
  ){}

  closeHandler(): void {
    this.dialogRef.close();
  }

  submitHandler(formValue: any){
    console.log('submit 222')
  }

  genderOptions = [
    { label: 'Male', value: 'male' },
    { label: 'Female', value: 'female' },
    { label: 'Other', value: 'other' },
  ];
}
