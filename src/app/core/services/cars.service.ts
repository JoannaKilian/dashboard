import { Injectable, OnDestroy } from "@angular/core";
import { BehaviorSubject, Observable, Subscription } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Validators } from "@angular/forms";
import { v4 as uuidv4 } from 'uuid';
import { MatDialog } from "@angular/material/dialog";
import { Car } from "../models/car.models";
import { FieldType, FormConfig } from "../models/form-config.models";
import { InfoDialogComponent } from "../shared/components/info-dialog/info-dialog/info-dialog.component";
import { UserService } from "./user.service";
import { environment } from "src/environments/environment";


@Injectable({
    providedIn: 'root'
})

export class CarService implements OnDestroy {

    private dataList: Car[] = [];
    private dataListSubject: BehaviorSubject<Car[]> = new BehaviorSubject<Car[]>([]);
    public data$: Observable<Car[]> = this.dataListSubject.asObservable();

    private url: string;
    uid: string | null;
    subscription: Subscription = new Subscription();

    private formFields: FormConfig[] = [
        {
            type: FieldType.Select, label: 'Brand', name: 'brand', options: [
                'Audi', 'BMW', 'Chevrolet', 'Ford', 'Honda', 'Hyundai', 'Mercedes', 'Nissan', 'Toyota', 'Volkswagen'
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
        { type: FieldType.Number, label: 'Engine Capacity', name: 'engineCapacity (L)' },
        { type: FieldType.Number, label: 'Engine Power', name: 'enginePower' },
    ];

    constructor(
        private http: HttpClient,
        public dialog: MatDialog,
        private userService: UserService,
    ) {
        this.uid = userService.getUid();
        this.url = `${environment.firebaseConfig.databaseURL}/users/${this.uid}/cars/carsList.json`;
    };

    getList() {
        this.subscription.add(this.http.get<Car[]>(this.url)
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
                            description: 'Error while fetching data',
                            type: 'error'
                        }
                    });
                }
            }))
    }

    addUniqueId(): string {
        return uuidv4();
    }

    add(item: Car) {
        console.log('this.url', this.url)
        const clonedList = [...this.dataList, item];
        this.dataListSubject.next(clonedList);
        this.subscription.add(this.http.put<Car[]>(this.url, clonedList)
            .subscribe(() => {
                this.dataList = clonedList;
            }))
    }

    update(updatedItem: Car) {
        const clonedList = [...this.dataList];
        const index = clonedList.findIndex(x => x.id === updatedItem.id)
        if (index !== -1) {
            clonedList[index] = updatedItem;
            this.dataListSubject.next(clonedList);
            this.subscription.add(this.http.put<Car[]>(this.url, clonedList)
                .subscribe(() => {
                    this.dataList = clonedList;
                }))
        }
    }

    delete(item: Car) {
        const clonedList = [...this.dataList];
        const index = clonedList.findIndex(x => x.id === item.id);
        if (index !== -1) {
            clonedList.splice(index, 1);
            this.dataListSubject.next(clonedList);
            this.subscription.add(this.http.put<Car[]>(this.url, clonedList)
                .subscribe(() => {
                    this.dataList = clonedList;
                }))
        }
    }

    getFormFields() {
        return this.formFields.slice()
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }
}