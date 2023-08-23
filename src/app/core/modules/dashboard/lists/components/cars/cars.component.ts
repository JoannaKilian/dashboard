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
import { EntityCategory } from 'src/app/core/models/category-list.models';

@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.scss'],
  providers: [AlertService]
})
export class CarsComponent implements OnInit, OnDestroy {
  data$: Observable<Car[]>;
  alerts$: Observable<Alert[]>;

  title: EntityCategory = 'cars';
  headers: string[] = ['brand', 'model', 'productionYear'];
  subscription: Subscription = new Subscription();

  constructor(
    public dialog: MatDialog,
    private dataService: CarService,
    private alertService: AlertService,
  ) { }

  ngOnInit(): void {
    this.alertService.getAlerts(this.title);
    this.dataService.getList();
    this.data$ = this.dataService.data$;
    this.alerts$ = this.alertService.categoryAlerts$

  }

  addDialog() {
    this.dialog.open(AddCarDialogComponent, {
      width: '500px',
      data: {
        alertService: this.alertService
      }
    });
  }

  editDialog(car: Car) {
    this.dialog.open(UpdateCarDialogComponent, {
      width: '500px',
      data: {
        title: this.title,
        car: car,
        alertService: this.alertService
      }
    });
  }

  deleteDialog(item: Car) {

    const dialogRef = this.dialog.open(InfoDialogComponent, {
      data: {
        title: `Delete ${item.brand}`,
        description: `Are you sure you want to delete ${item.brand} ${item.model}`,
        type: 'submit'
      }
    });
    this.subscription.add(dialogRef.afterClosed().subscribe((result) => {
      if (result === 'submit') {
        this.alertService.deleteAlert(this.title, item.id);
        this.dataService.delete(item);
      }
    }))
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
