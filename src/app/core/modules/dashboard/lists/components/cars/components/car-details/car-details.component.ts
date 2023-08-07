import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { filter, find, first, map, switchMap } from 'rxjs/operators';
import { Car } from 'src/app/core/models/car.models';
import { CarService } from 'src/app/core/services/cars.service';
import { TimeAlertService } from 'src/app/core/services/time-alert.service.service';

@Component({
  selector: 'app-car-details',
  templateUrl: './car-details.component.html',
  styleUrls: ['./car-details.component.scss']
})
export class CarDetailsComponent implements OnInit {

  @Input() carDetails: Car;

  timeAlert: boolean = false;
  expirationDate: number;

  constructor(
    private timeAlertService: TimeAlertService,
    private carService: CarService,
    ) { }

  ngOnInit(): void {
    this.carService.cars$
    .pipe(
      switchMap(cars => cars),
      filter(car => car.id === this.carDetails.id)
    )
    .subscribe((foundCar: Car) => {
      console.log('Szczegóły samochodu', foundCar);
    });

    this.expirationDate = this.timeAlertService.getCountEndTime(this.carDetails.insuranceDate);
    this.checkTimeAlert();
  }

  checkTimeAlert(): void {
    if (this.expirationDate <= 30) {
      this.timeAlertService.setTimeAlert("Cars", this.carDetails.id, this.carDetails.brand, this.carDetails.model, this.expirationDate);
    } else {
      this.timeAlertService.deleteTimeAlert(this.carDetails.id)
    }
  }
}

