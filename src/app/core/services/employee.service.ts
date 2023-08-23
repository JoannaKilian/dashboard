import { Injectable, OnDestroy } from "@angular/core";
import { BehaviorSubject, Observable, Subscription } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Validators } from "@angular/forms";
import { v4 as uuidv4 } from 'uuid';
import { MatDialog } from "@angular/material/dialog";
import { FieldType, FormConfig } from "../models/form-config.models";
import { InfoDialogComponent } from "../shared/components/info-dialog/info-dialog/info-dialog.component";
import { Employees } from "../models/employees.models";


@Injectable({
    providedIn: 'root'
})

export class EmployeesService implements OnDestroy {

    private dataList: Employees[] = [];
    private dataListSubject: BehaviorSubject<Employees[]> = new BehaviorSubject<Employees[]>([]);
    public data$: Observable<Employees[]> = this.dataListSubject.asObservable();

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

    private url = 'https://dashboard-e83c7-default-rtdb.firebaseio.com/employees/employeesList.json';
    subscription: Subscription = new Subscription();

    constructor(
        private http: HttpClient,
        public dialog: MatDialog,
    ) {
    };

    getList() {
        this.subscription.add(this.http.get<Employees[]>(this.url)
            .subscribe({
                next: (response: Employees[] | null) => {
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

    add(item: Employees) {
        const clonedList = [...this.dataList, item];
        this.dataListSubject.next(clonedList);
        this.subscription.add(this.http.put<Employees[]>(this.url, clonedList)
        .subscribe(() => {
            this.dataList = clonedList;
        }))
    }

    update(updatedItem: Employees) {
        const clonedList = [...this.dataList];
        const index = clonedList.findIndex(x => x.id === updatedItem.id)
        if (index !== -1) {
            clonedList[index] = updatedItem;
            this.dataListSubject.next(clonedList);
            this.subscription.add(this.http.put<Employees[]>(this.url, clonedList)
            .subscribe(() => {
                this.dataList = clonedList;
            }))
        }
    }

    delete(item: Employees) {
        const clonedList = [...this.dataList];
        const index = clonedList.findIndex(x => x.id === item.id);
        if (index !== -1) {
            clonedList.splice(index, 1);
            this.dataListSubject.next(clonedList);
            this.subscription.add(this.http.put<Employees[]>(this.url, clonedList)
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