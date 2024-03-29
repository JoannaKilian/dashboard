import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Car } from 'src/app/core/models/car.models';
import { UpdateCarDialogComponent } from '../update-car-dialog/update-car-dialog.component';
import { MatDialogRef } from '@angular/material/dialog';
import { FormConfig } from 'src/app/core/models/form-config.models';
import { CarService } from 'src/app/core/services/cars.service';

@Component({
  selector: 'app-car-form',
  templateUrl: './car-form.component.html',
  styleUrls: ['./car-form.component.scss']
})
export class CarFormComponent implements OnInit {

  @Input() data: Car;
  @Output() submitFormEvent: EventEmitter<Car> = new EventEmitter();

  formFields: FormConfig[];

  constructor(
    public dialogRef: MatDialogRef<UpdateCarDialogComponent>,
    private dataService: CarService
  ) { }

  ngOnInit(): void {
    this.formFields = this.dataService.getFormFields();
  }

  closeHandler(): void {
    this.dialogRef.close();
  }

  submitHandler(formValue: Car) {
    this.submitFormEvent.emit(formValue);
  }
}
