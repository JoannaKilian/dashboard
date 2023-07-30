import { EventEmitter, Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Car } from "../models/car.models";
import { FieldType, FormConfig } from "../models/form-config.models";
import { Validators } from "@angular/forms";
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})

export class CarService {

    carsChanged: Subject<Car[]> = new Subject<Car[]>();
    private carsList: Car[] = [
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
        }
    ];

    private formFields: FormConfig[] = [
        {
            type: FieldType.Select, label: 'Brand', name: 'brand', options: [
                'Toyota',
                'Volkswagen',
                'Ford',
                'Honda',
                'Chevrolet',
                'Nissan',
                'Hyundai',
                'BMW'
            ], validations: [Validators.required]
        },
        { type: FieldType.Text, label: 'Model', name: 'model' },
        { type: FieldType.Number, label: 'Production Year', name: 'productionYear' },
        {
            type: FieldType.Select, label: 'Color', name: 'color', options: [
                'Red',
                'Blue',
                'Green',
                'Black',
                'White',
                'Yellow',
                'Silver',
                'Gray'
            ]
        },
        { type: FieldType.Date, label: 'Insurance Date', name: 'insuranceDate', validations: [Validators.required] },
        { type: FieldType.Number, label: 'Engine Capacity', name: 'engineCapacity' },
        { type: FieldType.Number, label: 'Engine Power', name: 'enginePower' },
    ];

    private carsUrl = 'https://dashboard-e83c7-default-rtdb.firebaseio.com/cars.json';

    constructor(
        private http: HttpClient) { };

    getCarsList() {
        this.http.get<Car[]>(this.carsUrl)
            .subscribe(response => {
                console.log(response)
            })
        return this.carsList.slice();
    }

    addNewCar(car: Car) {
        this.carsList.push(car);
        this.carsChanged.next(this.carsList.slice());
        this.http.put<Car[]>(this.carsUrl, this.carsList.slice())
            .subscribe(response => {
                console.log(response)
            })
    }

    updateCar(index: number, updatedCar: Car) {
        this.carsList[index] = updatedCar;
        this.carsChanged.next(this.carsList.slice());
        this.http.put<Car[]>(this.carsUrl, this.carsList.slice())
        .subscribe(response => {
            console.log(response)
        })
    }

    deleteCar(index: number) {
        this.carsList.splice(index, 1);
        this.carsChanged.next(this.carsList.slice());
        this.http.put<Car[]>(this.carsUrl, this.carsList.slice())
            .subscribe(response => {
                console.log(response)
            })
    }

    getFormFields() {
        return this.formFields.slice()
    }
}