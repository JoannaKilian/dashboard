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

    private dataList: Car[] = [];
    private dataListSubject: BehaviorSubject<Car[]> = new BehaviorSubject<Car[]>([]);
    public data$: Observable<Car[]> = this.dataListSubject.asObservable();

    private url: string;

    private formFields: FormConfig[] = [
        {
            type: FieldType.Select, label: 'Brand', name: 'brand', options: [
                'Audi', 'BMW', 'Chevrolet', 'Ford', 'Honda', 'Hyundai', 'Mercedes', 'Nissan', 'Toyota', 'Volkswagen', 'Fiat', 'Renault', 'Citroen', 'Suzuki', 'Inny'
            ], validations: [Validators.required]
        },
        { type: FieldType.Text, label: 'Model', name: 'model', validations: [Validators.required] },
        { type: FieldType.Number, label: 'Registration number', name: 'registrationNumber' },
        { type: FieldType.Number, label: 'Production Year', name: 'productionYear', validations: [Validators.required] },
        {
            type: FieldType.Select, label: 'Color', name: 'color', options: [
                'Red',
                'Black',
                'Blue',
                'Green',
                'White',
                'Yellow',
                'Silver',
                'Gray'
            ]
        },
        { type: FieldType.Date, label: 'Insurance Date', name: 'insuranceDate', validations: [Validators.required] },
        { type: FieldType.Date, label: 'Car Inspection', name: 'carInspection', validations: [Validators.required] },
        { type: FieldType.Number, label: 'Engine Capacity', name: 'engineCapacity (L)' },
    ];

    constructor(
        private http: HttpClient,
        public dialog: MatDialog,
    ) {
        this.url = `/cars/carsList.json`;
    };

    getList() {
        this.http.get<Car[]>(this.url)
            .subscribe({
                next: (response: Car[] | null) => {
                    const data = response !== null ? response : [];
                    this.dataList = data;
                    this.dataListSubject.next(data);
                },
                error: () => {
                    this.dialog.open(InfoDialogComponent, {
                        data: {
                            title: 'Error',
                            description: 'Error while fetching car data',
                            type: 'error'
                        }
                    });
                }
            })
    }

    addUniqueId(): string {
        return uuidv4();
    }

    add(item: Car) {
        const clonedList = [...this.dataList, item];
        this.dataListSubject.next(clonedList);
        this.http.put<Car[]>(this.url, clonedList)
            .subscribe(() => {
                this.dataList = clonedList;
            })
    }

    update(updatedItem: Car) {
        const clonedList = [...this.dataList];
        const index = clonedList.findIndex(x => x.id === updatedItem.id)
        if (index !== -1) {
            clonedList[index] = updatedItem;
            this.dataListSubject.next(clonedList);
            this.http.put<Car[]>(this.url, clonedList)
                .subscribe(() => {
                    this.dataList = clonedList;
                })
        }
    }

    delete(item: Car) {
        const clonedList = [...this.dataList];
        const index = clonedList.findIndex(x => x.id === item.id);
        if (index !== -1) {
            clonedList.splice(index, 1);
            this.dataListSubject.next(clonedList);
            this.http.put<Car[]>(this.url, clonedList)
                .subscribe(() => {
                    this.dataList = clonedList;
                })
        }
    }

    getFormFields() {
        return this.formFields.slice()
    }
}