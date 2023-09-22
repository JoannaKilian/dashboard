import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Car } from 'src/app/core/models/car.models';
import { EntityCategory } from 'src/app/core/models/category-list.models';
import { CarService } from 'src/app/core/services/cars.service';

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
  ) { }

  title: EntityCategory;
  newItem: Car;

  ngOnInit() {
    this.title = this.dialogData.title;
  }

  addHandler(item: Car) {
    const id: string = this.dataService.addUniqueId();
    item.id = id;
    this.newItem = item
    this.dataService.add(this.newItem);
  }
}
