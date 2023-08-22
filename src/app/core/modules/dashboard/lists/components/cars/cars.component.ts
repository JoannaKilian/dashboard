import { Component, OnDestroy, OnInit } from '@angular/core';
import { Car } from 'src/app/core/models/car.models';

import { AddCarDialogComponent } from './components/add-car-dialog/add-car-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { UpdateCarDialogComponent } from './components/update-car-dialog/update-car-dialog.component';
import { CarService } from 'src/app/core/services/cars.service';
import { Observable, Subscription } from 'rxjs';
import { AlertService } from 'src/app/core/services/alert.service';
import { Alert } from 'src/app/core/models/alert.models';
import { InfoDialogComponent } from 'src/app/core/shared/components/info-dialog/info-dialog/info-dialog.component';

@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.scss'],
  providers: [AlertService]
})
export class CarsComponent implements OnInit, OnDestroy {
  data$: Observable<Car[]>;
  carAlerts$: Observable<Alert[]>;

  headers: string[] = ['brand', 'model', 'productionYear'];
  subscription: Subscription = new Subscription();

  constructor(
    public dialog: MatDialog,
    private carService: CarService,
    private alertService: AlertService,
  ) { }

  ngOnInit(): void {
    this.alertService.getAlerts('cars');
    this.carService.getCarsList();
    this.data$ = this.carService.cars$;
    this.carAlerts$ = this.alertService.categoryAlerts$

  }

  addCarDialog() {
    this.dialog.open(AddCarDialogComponent, {
      width: '500px',
      data: {
        alertService: this.alertService
      }
    });
  }

  editCarDialog(car: Car) {
    this.dialog.open(UpdateCarDialogComponent, {
      width: '500px',
      data: {
        car: car,
        alertService: this.alertService
      }
    });
  }

  deleteCarDialog(car: Car) {

    const dialogRef = this.dialog.open(InfoDialogComponent, {
      data: {
        title: `Delete ${car.brand}`,
        description: `Are you sure you want to delete ${car.brand} ${car.model}`,
        type: 'submit'
      }
    });
    this.subscription.add(dialogRef.afterClosed().subscribe((result) => {
      if (result === 'submit') {
        this.alertService.deleteAlert('cars', car.id);
        this.carService.deleteCar(car);
      }
    }))
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
