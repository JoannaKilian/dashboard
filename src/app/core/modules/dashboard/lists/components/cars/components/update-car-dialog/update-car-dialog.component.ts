import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Car } from 'src/app/core/models/car.models';
import { EntityCategory } from 'src/app/core/models/category-list.models';
import { CarService } from 'src/app/core/services/cars.service';

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
  ) { }

  title: EntityCategory;
  car: Car;

  ngOnInit() {
    this.title = this.dialogData.title;
    this.car = this.dialogData.car;
  }

  updateHandler(updateItem: Car) {
    updateItem.id = this.car.id;
    this.dataService.update(updateItem);
  }
}
