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
  data: Car[] = [];

  headers: string[] = ['brand', 'model', 'productionYear'];
  private subscription: Subscription;

  constructor(
    public dialog: MatDialog,
    private carService: CarService,
  ) { }

  ngOnInit(): void {
    this.carService.getCarsList();
    this.carService.cars$.subscribe((data: Car[]) => {
      console.log('data', data);
      this.data = data;
    });
  }

  addCarDialog() {
    this.dialog.open(AddCarDialogComponent, {
      width: '500px',
    });
  }

  editCarDialog(data: Car) {
    this.dialog.open(UpdateCarDialogComponent, {
      width: '500px',
      data
    });
  }

  deleteCarDialog(car: Car) {
    this.carService.deleteCar(car);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
