import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, exhaustMap, of, switchMap } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Validators } from "@angular/forms";
import { v4 as uuidv4 } from 'uuid';
import { MatDialog } from "@angular/material/dialog";
import { Car } from "../models/car.models";
import { FieldType, FormConfig } from "../models/form-config.models";
import { InfoDialogComponent } from "../shared/components/info-dialog/info-dialog/info-dialog.component";
import { EntityCategory } from "../models/category-list.models";
import { AlertsService } from "./alerts.service";
import { TimeAlertService } from "./time-alert.service";
import { DaysAlertService } from "./days-alert.service";


@Injectable({
    providedIn: 'root'
})

export class CarService {

    private dataList: Car[] = [];
    private dataListSubject: BehaviorSubject<Car[]> = new BehaviorSubject<Car[]>([]);
    public data$: Observable<Car[]> = this.dataListSubject.asObservable();
    title: EntityCategory = "cars";

    private url: string;

    private formFields: FormConfig[] = [
        {
            type: FieldType.Select, label: 'Brand', name: 'brand', options: [
                'Audi', 'BMW', 'Chevrolet', 'Ford', 'Honda', 'Hyundai', 'Mercedes', 'Nissan', 'Toyota', 'Volkswagen', 'Fiat', 'Renault', 'Citroen', 'Suzuki', 'Another'
            ], validations: [Validators.required]
        },
        { type: FieldType.Text, label: 'Model', name: 'model', validations: [Validators.required] },
        { type: FieldType.Text, label: 'Registration number', name: 'registrationNumber' },
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
        { type: FieldType.Number, label: 'Engine Capacity', name: 'engineCapacity' },
    ];

    constructor(
        private http: HttpClient,
        public dialog: MatDialog,
        private alertsService: AlertsService,
        private timeAlertService: TimeAlertService,
        private daysAlertService: DaysAlertService,
    ) {
        this.url = `/cars/carsList.json`;
    };

    getList() {
        this.http.get<Car[]>(this.url)
            .subscribe({
                next: (response: Car[] | null) => {
                    const data = response !== null ? response : [];
                    this.dataList = data;
                    this.alertsService.deleteAllAlerts(this.title);
                    this.addAlerts(data);
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
                this.addAlerts([item]);
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
                    this.alertsService.deleteAlert(this.title, updatedItem.id)
                    this.addAlerts([updatedItem]);
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
                    this.alertsService.deleteAlert(this.title, item.id)
                })
        }
    }

    getFormFields() {
        return this.formFields.slice()
    }

    addAlerts(data: Car[]) {
        data.map(item => {
            const insuranceDate = this.timeAlertService.getCountEndTime(item.insuranceDate);
            this.checkTimeAlert(insuranceDate, 'Insurance', item);
            const inspectionDate = this.timeAlertService.getCountEndTime(item.carInspection);
            this.checkTimeAlert(inspectionDate, 'Inspection', item);
        })
    }

    checkTimeAlert(expirationDate: number, eventName: string, item: Car): void {
        const needAlert = this.daysAlertService.checkTime(expirationDate);
        if (needAlert) {
            this.alertsService.addAlert(this.title, item.id, item.brand, item.model, expirationDate, eventName);
        }
    }
}