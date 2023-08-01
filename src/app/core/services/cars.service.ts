import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, Subject } from "rxjs";
import { Car } from "../models/car.models";
import { FieldType, FormConfig } from "../models/form-config.models";
import { Validators } from "@angular/forms";
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})

export class CarService {

    carsChanged: Subject<Car[]> = new Subject<Car[]>();
    private carsList: Car[] = [];
    private carsListSubject: BehaviorSubject<Car[]> = new BehaviorSubject<Car[]>([]);
    public cars$: Observable<Car[]> = this.carsListSubject.asObservable();

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
        private http: HttpClient) {
    };

    getCarsList() {
        this.http.get<Car[]>(this.carsUrl)
            .subscribe((response: Car[]) => {
                this.carsList = response;
                this.carsListSubject.next(response);
            })
    }

    addNewCar(car: Car) {
        const clonedCarsList = [...this.carsList];
        clonedCarsList.push(car);
        this.http.put<Car[]>(this.carsUrl, clonedCarsList)
            .subscribe(() => {
                this.carsList = clonedCarsList;
                this.carsListSubject.next([...this.carsList])
            })
    }

    updateCar(index: number, updatedCar: Car) {
        const clonedCarsList = [...this.carsList];
        clonedCarsList[index] = updatedCar;
        this.http.put<Car>(this.carsUrl, clonedCarsList)
            .subscribe(() => {
                this.carsList = clonedCarsList;
                this.carsListSubject.next([...this.carsList])
            })
    }

    deleteCar(index: number) {
        const clonedCarsList = [...this.carsList];
        clonedCarsList.splice(index, 1);
        this.http.put<Car[]>(this.carsUrl, clonedCarsList)
            .subscribe(() => {
                this.carsList = clonedCarsList;
                this.carsListSubject.next([...this.carsList])
            })
    }

    getFormFields() {
        return this.formFields.slice()
    }
}