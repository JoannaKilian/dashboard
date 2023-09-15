import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Validators } from "@angular/forms";
import { v4 as uuidv4 } from 'uuid';
import { MatDialog } from "@angular/material/dialog";
import { FieldType, FormConfig } from "../models/form-config.models";
import { InfoDialogComponent } from "../shared/components/info-dialog/info-dialog/info-dialog.component";
import { Bill } from "../models/bills.models";
import { UserService } from "./user.service";


@Injectable({
    providedIn: 'root'
})

export class BillsService {

    private dataList: Bill[] = [];
    private dataListSubject: BehaviorSubject<Bill[]> = new BehaviorSubject<Bill[]>([]);
    public data$: Observable<Bill[]> = this.dataListSubject.asObservable();

    private formFields: FormConfig[] = [
        { type: FieldType.Text, label: 'Name', name: 'name', validations: [Validators.required] },
        { type: FieldType.Date, label: 'Payment date', name: 'date', validations: [Validators.required] },
        {
            type: FieldType.Select,
            label: 'Payment Frequency',
            name: 'frequency',
            options: [
                'Monthly',
                'Every 2 Months',
                'Quarterly',
                'Semi-Annually',
                'Annually',
            ],
            validations: [Validators.required]
        },
    ];

    private url: string;

    constructor(
        private http: HttpClient,
        public dialog: MatDialog,
        private userService: UserService,
    ) {
        this.url = `/bills/billsList.json`;
    };

    getList() {
        this.userService.user
         
        this.http.get<Bill[]>(this.url)
            .subscribe({
                next: (response: Bill[] | null) => {
                    const data = response !== null ? response : [];
                    this.dataList = data;
                    this.dataListSubject.next(data);
                },
                error: () => {
                    this.dialog.open(InfoDialogComponent, {
                        data: {
                            title: 'Error',
                            description: 'Error while fetching bills data',
                            type: 'error'
                        }
                    });
                }
            })
    }

    addUniqueId(): string {
        return uuidv4();
    }

    add(item: Bill) {
        const clonedList = [...this.dataList, item];
        this.dataListSubject.next(clonedList);
       this.http.put<Bill[]>(this.url, clonedList)
            .subscribe(() => {
                this.dataList = clonedList;
            })
    }

    update(updatedItem: Bill) {
        const clonedList = [...this.dataList];
        const index = clonedList.findIndex(x => x.id === updatedItem.id)
        if (index !== -1) {
            clonedList[index] = updatedItem;
            this.dataListSubject.next(clonedList);
            this.http.put<Bill[]>(this.url, clonedList)
                .subscribe(() => {
                    this.dataList = clonedList;
                })
        }
    }

    delete(item: Bill) {
        const clonedList = [...this.dataList];
        const index = clonedList.findIndex(x => x.id === item.id);
        if (index !== -1) {
            clonedList.splice(index, 1);
            this.dataListSubject.next(clonedList);
            this.http.put<Bill[]>(this.url, clonedList)
                .subscribe(() => {
                    this.dataList = clonedList;
                })
        }
    }

    getFormFields() {
        return this.formFields.slice()
    }

    getPaymentIntervalDays(paymentInterval: string): number {
        switch (paymentInterval) {
            case 'Monthly':
                return 30;
            case 'Every 2 Months':
                return 60;
            case 'Quarterly':
                return 90;
            case 'Semi-Annually':
                return 182;
            case 'Annually':
                return 365;
            default:
                return 30;
        }
    }
}