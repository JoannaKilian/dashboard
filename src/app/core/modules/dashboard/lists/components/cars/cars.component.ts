import { Component } from '@angular/core';
import { Car } from 'src/app/core/models/car.models';

@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.scss']
})
export class CarsComponent {
  data: Car[] = [
    {
      brand: "Toyota",
      model: "Corolla",
      productionYear: 2022,
      color: "red",
      insuranceDate: "2024-01-15",
      engineCapacity: 1.8,
      enginePower: 140
    },
    {
      brand: "Honda",
      model: "Civic",
      productionYear: 2021,
      color: "blue",
      insuranceDate: "2023-07-19",
      engineCapacity: 1.5,
      enginePower: 130
    },
    {
      brand: "Audi",
      model: "A4",
      productionYear: 2022,
      color: "grey",
      insuranceDate: "2023-08-20",
      engineCapacity: 2.0,
      enginePower: 190
    },
    {
      brand: "Mercedes",
      model: "Atego",
      productionYear: 2020,
      color: "darkgreen",
      insuranceDate: "2024-07-01",
      engineCapacity: 3.0,
      enginePower: 300
    },
  ];

  headers: string[] = ['brand', 'model', 'productionYear'];
}