import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Car } from 'src/app/core/models/car.models';
import { EntityCategory } from 'src/app/core/models/category-list.models';
import { TimeAlertService } from 'src/app/core/services/time-alert.service';

@Component({
  selector: 'app-car-details',
  templateUrl: './car-details.component.html',
  styleUrls: ['./car-details.component.scss']
})
export class CarDetailsComponent implements OnInit, OnDestroy {

  @Input() details: Car;
  @Input() title: EntityCategory;

  insuranceDate: number;
  inspectionDate: number;
  subscription: Subscription = new Subscription();

  constructor(
    private timeAlertService: TimeAlertService,
  ) { }

  ngOnInit(): void {
    this.insuranceDate = this.timeAlertService.getCountEndTime(this.details.insuranceDate);
    this.inspectionDate = this.timeAlertService.getCountEndTime(this.details.carInspection);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}

