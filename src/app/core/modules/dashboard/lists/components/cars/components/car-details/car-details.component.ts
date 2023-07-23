import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Car } from 'src/app/core/models/car.models';
import { TimeAlertService } from 'src/app/core/services/time-alert.service.service';

@Component({
  selector: 'app-car-details',
  templateUrl: './car-details.component.html',
  styleUrls: ['./car-details.component.scss']
})
export class CarDetailsComponent implements OnInit {

  @Input() carDetails: Car;
  @Output() timeAlertEvent = new EventEmitter<boolean>;

  timeAlert: boolean = false;
  expirationDate: number;

  constructor(private timeAlertService: TimeAlertService) { }

  ngOnInit(): void {
    this.expirationDate = this.timeAlertService.getCountEndTime(this.carDetails.insuranceDate);
    this.checkTimeAlert();
  }

  checkTimeAlert(): void {
    if (this.expirationDate <= 30) {
      this.timeAlertService.emitTimeAlert("Cars", this.carDetails.brand, this.carDetails.model, this.expirationDate);
    }
  }
}

