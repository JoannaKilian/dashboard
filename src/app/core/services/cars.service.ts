import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Validators } from "@angular/forms";
import { v4 as uuidv4 } from 'uuid';
import { MatDialog } from "@angular/material/dialog";
import { Car } from "../models/car.models";
import { FieldType, FormConfig } from "../models/form-config.models";
import { InfoDialogComponent } from "../shared/components/info-dialog/info-dialog/info-dialog.component";


@Injectable({
    providedIn: 'root'
})

export class CarService {

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
        { type: FieldType.Text, label: 'Model', name: 'model', validations: [Validators.required] },
        { type: FieldType.Number, label: 'Production Year', name: 'productionYear', validations: [Validators.required] },
        {
            type: FieldType.Select, label: 'Color', name: 'color', options: [
                'Red',
                'Blue',
                'Green',
                'Black',
                'Yellow',
                'Silver',
                'Gray'
            ]
        },
        { type: FieldType.Date, label: 'Insurance Date', name: 'insuranceDate', validations: [Validators.required] },
        { type: FieldType.Date, label: 'Car Inspection', name: 'carInspection', validations: [Validators.required] },
        { type: FieldType.Number, label: 'Engine Capacity', name: 'engineCapacity' },
        { type: FieldType.Number, label: 'Engine Power', name: 'enginePower' },
    ];

    private carsUrl = 'https://dashboard-e83c7-default-rtdb.firebaseio.com/cars/carsList.json';

    constructor(
        private http: HttpClient,
        public dialog: MatDialog,
    ) {
    };

    getCarsList() {
        this.http.get<Car[]>(this.carsUrl)
            .subscribe({
                next: (response: Car[] | null) => {
                    console.log('getCarsList from service');
                    const data = response !== null ? response : [];
                    this.carsList = data;
                    this.carsListSubject.next(data);
                },
                error: () => {
                    this.dialog.open(InfoDialogComponent, {
                        data: {
                            title: 'Error',
                            description: 'Error while fetching data',
                            type: 'error'
                        }
                    });
                }
            });
    }

    addCarUniqueId(): string{
        return uuidv4();
      }

    addNewCar(car: Car) { 
        const clonedCarsList = [...this.carsList, car];
        this.carsListSubject.next(clonedCarsList);
        this.http.put<Car[]>(this.carsUrl, clonedCarsList)
            .subscribe(() => {
                this.carsList = clonedCarsList;
            })
    }

    updateCar(updatedCar: Car) {
        const clonedCarsList = [...this.carsList];
        const carIndex = clonedCarsList.findIndex(x => x.id === updatedCar.id)
        if (carIndex !== -1) {
            clonedCarsList[carIndex] = updatedCar;
            this.carsListSubject.next(clonedCarsList);
            this.http.put<Car[]>(this.carsUrl, clonedCarsList)
                .subscribe(() => {
                    console.log('carservice update', clonedCarsList);
                    this.carsList = clonedCarsList;
                })
        }
    }

    deleteCar(car: Car) {
        const clonedCarsList = [...this.carsList];
        const carIndex = clonedCarsList.findIndex(x => x.id === car.id);
        if (carIndex !== -1) {
            clonedCarsList.splice(carIndex, 1);
            this.carsListSubject.next(clonedCarsList)
            this.http.put<Car[]>(this.carsUrl, clonedCarsList)
                .subscribe(() => {
                    this.carsList = clonedCarsList;
                })
        }
    }

    getFormFields() {
        return this.formFields.slice()
    }
}