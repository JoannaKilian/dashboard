import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Validators } from "@angular/forms";
import { v4 as uuidv4 } from 'uuid';
import { MatDialog } from "@angular/material/dialog";
import { FieldType, FormConfig } from "../models/form-config.models";
import { InfoDialogComponent } from "../shared/components/info-dialog/info-dialog/info-dialog.component";
import { Person } from "../models/person.models";
import { EntityCategory } from "../models/category-list.models";
import { TimeAlertService } from "./time-alert.service";
import { AlertsService } from "./alerts.service";


@Injectable({
    providedIn: 'root'
})

export class PersonsService {

    private dataList: Person[] = [];
    private dataListSubject: BehaviorSubject<Person[]> = new BehaviorSubject<Person[]>([]);
    public data$: Observable<Person[]> = this.dataListSubject.asObservable();
    title: EntityCategory = "persons"

    private formFields: FormConfig[] = [
        { type: FieldType.Text, label: 'Name', name: 'name', validations: [Validators.required] },
        { type: FieldType.Text, label: 'Surname', name: 'surname', validations: [Validators.required] },
        {
            type: FieldType.Select, label: 'Sex', name: 'sex', options: [
                'Male',
                'Female',
            ], validations: [Validators.required]
        },
        { type: FieldType.Date, label: 'Date Of Birth', name: 'dateOfBirth', validations: [Validators.required] },
        { type: FieldType.Date, label: 'Name Day', name: 'nameDay' },
        { type: FieldType.Number, label: 'PESEL', name: 'socialSecurityNumber' },
        { type: FieldType.Text, label: 'ID card', name: 'IDcard' },
    ];

    private url: string;

    constructor(
        private http: HttpClient,
        public dialog: MatDialog,
        private timeAlertService: TimeAlertService,
        private alertsService: AlertsService
    ) {
        this.url = `/persons/personsList.json`;
    };

    getList() {
        this.http.get<Person[]>(this.url)
            .subscribe({
                next: (response: Person[] | null) => {
                    const data = response !== null ? response : [];
                    this.dataList = data;
                    this.dataListSubject.next(data);
                    this.addAlerts(data);
                },
                error: () => {
                    this.dialog.open(InfoDialogComponent, {
                        data: {
                            title: 'Error',
                            description: 'Error while fetching persons data',
                            type: 'error'
                        }
                    });
                }
            })
    }

    addUniqueId(): string {
        return uuidv4();
    }

    add(item: Person) {
        const clonedList = [...this.dataList, item];
        this.dataListSubject.next(clonedList);
        this.http.put<Person[]>(this.url, clonedList)
            .subscribe(() => {
                this.dataList = clonedList;
                this.addAlerts([item]);
            })
    }

    update(updatedItem: Person) {
        const clonedList = [...this.dataList];
        const index = clonedList.findIndex(x => x.id === updatedItem.id)
        if (index !== -1) {
            clonedList[index] = updatedItem;
            this.dataListSubject.next(clonedList);
            this.http.put<Person[]>(this.url, clonedList)
                .subscribe(() => {
                    this.dataList = clonedList;
                    this.alertsService.deleteAlert(this.title, updatedItem.id)
                    this.addAlerts([updatedItem]);
                })
        }
    }

    delete(item: Person) {
        const clonedList = [...this.dataList];
        const index = clonedList.findIndex(x => x.id === item.id);
        if (index !== -1) {
            clonedList.splice(index, 1);
            this.dataListSubject.next(clonedList);
            this.http.put<Person[]>(this.url, clonedList)
                .subscribe(() => {
                    this.dataList = clonedList;
                    this.alertsService.deleteAlert(this.title, item.id)
                })
        }
    }

    getFormFields() {
        return this.formFields.slice()
    }

    addAlerts(data: Person[]) {
        data.map(item => {
            const birthdayDate = this.timeAlertService.getDaysToAnniversary(item.dateOfBirth);
            this.checkTimeAlert(birthdayDate, 'Birthday', item);
            if (item.nameDay) {
                const nameDayDate = this.timeAlertService.getDaysToAnniversary(item.nameDay);
                this.checkTimeAlert(nameDayDate, 'Name Day', item);
            }
        })
    }

    checkTimeAlert(expirationDate: number, eventName: string, item: Person): void {
        if (expirationDate <= 30) {
            this.alertsService.addAlert(this.title, item.id, item.name, item.surname, expirationDate, eventName);
        }
    }
}