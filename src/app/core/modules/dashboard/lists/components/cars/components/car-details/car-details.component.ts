import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-car-details',
  templateUrl: './car-details.component.html',
  styleUrls: ['./car-details.component.scss']
})
export class CarDetailsComponent implements OnInit {
  @Input() insuranceDate : string;
  @Input() color: string;
  @Input() engineCapacity : string;
  @Input() enginePower : string;

  expirationDate: number;
  currentDate = new Date();
  insuranceDateAsDate = new Date();

  ngOnInit(): void {
    this.insuranceDateAsDate = new Date(this.insuranceDate);

    if (this.insuranceDateAsDate < this.currentDate) {
      const dateDelta = this.currentDate.getTime() - this.insuranceDateAsDate.getTime();
      this.expirationDate = Math.floor(dateDelta / (1000 * 60 * 60 * 24));
    }
  }
}

