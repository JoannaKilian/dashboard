import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Alert } from 'src/app/core/models/alert.models';
import { Car } from 'src/app/core/models/car.models';
import { AlertService } from 'src/app/core/services/alert.service';
import { TimeAlertService } from 'src/app/core/services/time-alert.service';

@Component({
  selector: 'app-car-details',
  templateUrl: './car-details.component.html',
  styleUrls: ['./car-details.component.scss']
})
export class CarDetailsComponent implements OnInit, OnDestroy {

  @Input() carDetails: Car;
  @Input() alerts$: Observable<Alert[]>;

  insuranceDate: number;
  inspectionDate: number;
  alerts: Alert[];
  subscription: Subscription = new Subscription();

  constructor(
    private timeAlertService: TimeAlertService,
    private alertService: AlertService
  ) { }

  ngOnInit(): void {
    this.insuranceDate = this.timeAlertService.getCountEndTime(this.carDetails.insuranceDate);
    this.inspectionDate = this.timeAlertService.getCountEndTime(this.carDetails.carInspection);

    this.subscription.add(this.alerts$.subscribe(data => {
      this.alerts = data;
    }));

    if (this.alerts?.length > 0) {
      this.updateTimeAlert(this.insuranceDate, 'Insurance');
      this.updateTimeAlert(this.inspectionDate, 'Inspection');
    }
  }

  updateTimeAlert(expirationDate: number, name: string): void {
    const needUpdate = this.alertService.isUpdateAlertNeeded(this.carDetails.id, name, expirationDate);

    if (needUpdate && expirationDate <= 30) {
      this.alertService.updateAlert('cars', this.carDetails.id, this.carDetails.brand, this.carDetails.model, expirationDate, name);
    } else if (needUpdate) {
      this.alertService.deleteAlertByItem('cars', this.carDetails.id, name)
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}

