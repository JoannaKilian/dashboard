import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Car } from 'src/app/core/models/car.models';

import { AddCarDialogComponent } from './components/add-car-dialog/add-car-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { UpdateCarDialogComponent } from './components/update-car-dialog/update-car-dialog.component';
import { CarService } from 'src/app/core/services/cars.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.scss']
})
export class CarsComponent implements OnInit, OnDestroy {
  data: Car[];

  headers: string[] = ['brand', 'model', 'productionYear'];
  private subscription: Subscription;

  constructor(
    public dialog: MatDialog,
    private carService: CarService,
    private changeDetectorRef: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.data = this.carService.getCarsList();
    this.subscription = this.carService.carsChanged.subscribe((cars: Car[])=>{
      this.data = cars;
      this.changeDetectorRef.detectChanges();
    })

  }

  addCarDialog() {
    const dialogRef = this.dialog.open(AddCarDialogComponent, {
      width: '500px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  editCarDialog(data: Car) {
    const dialogRef = this.dialog.open(UpdateCarDialogComponent, {
      width: '500px',
      data
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  deleteCarDialog(data: Car) {
    console.log('deleteCarDialog', data);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
