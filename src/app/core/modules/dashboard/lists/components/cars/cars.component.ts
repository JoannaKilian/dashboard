import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Car } from 'src/app/core/models/car.models';

import { AddCarDialogComponent } from './components/add-car-dialog/add-car-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { UpdateCarDialogComponent } from './components/update-car-dialog/update-car-dialog.component';
import { CarService } from 'src/app/core/services/cars.service';
import { Subscription } from 'rxjs';
import { AlertService } from 'src/app/core/services/alert.service';
import { Alert } from 'src/app/core/models/alert.models';
import { InfoDialogComponent } from 'src/app/core/shared/components/info-dialog/info-dialog/info-dialog.component';

@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.scss']
})
export class CarsComponent implements OnInit, OnDestroy {
  data: Car[] = [];
  carAlerts: Alert[] = [];

  headers: string[] = ['brand', 'model', 'productionYear'];
  private subscription: Subscription = new Subscription();;

  constructor(
    public dialog: MatDialog,
    private carService: CarService,
    private alertService: AlertService,
  ) {this.alertService.getAlerts('cars') }

  ngOnInit(): void {
    this.carService.getCarsList();
    this.subscription.add(
      this.carService.cars$.subscribe((data: Car[]) => {
        this.data = data;
      })
    );
    this.subscription.add(
      this.alertService.categoryAlerts$.subscribe((alert: Alert[]) => {
        this.carAlerts = alert;
      })
    );
  }

  addCarDialog() {
    this.dialog.open(AddCarDialogComponent, {
      width: '500px',
    });
  }

  editCarDialog(car: Car) {
    this.dialog.open(UpdateCarDialogComponent, {
      width: '500px',
      data: car
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
    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'submit') {
        this.alertService.deleteAlert('cars', car.id);
        this.carService.deleteCar(car);
      }
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
