import { Component, Input, OnInit } from '@angular/core';
import { Car } from 'src/app/core/models/car.models';
import { AlertService } from 'src/app/core/services/alert.service';
import { TimeAlertService } from 'src/app/core/services/time-alert.service';

@Component({
  selector: 'app-car-details',
  templateUrl: './car-details.component.html',
  styleUrls: ['./car-details.component.scss']
})
export class CarDetailsComponent implements OnInit {

  @Input() carDetails: Car;

  insuranceDate: number;
  inspectionDate: number;

  constructor(
    private timeAlertService: TimeAlertService,
    private alertService: AlertService
  ) { }

  ngOnInit(): void {
    this.insuranceDate = this.timeAlertService.getCountEndTime(this.carDetails.insuranceDate);
    // this.updateTimeAlert(this.insuranceDate, 'Insurance');
    this.inspectionDate = this.timeAlertService.getCountEndTime(this.carDetails.carInspection);
    // this.updateTimeAlert(this.inspectionDate, 'Inspection');
  }

  updateTimeAlert(expirationDate: number, name: string): void {
    if (expirationDate <= 30) {
      this.alertService.updateAlert('cars', this.carDetails.id, this.carDetails.brand, this.carDetails.model, expirationDate, name);
    } else {
      this.alertService.deleteAlertByItem('cars', this.carDetails.id, name)
    }
  }
}

