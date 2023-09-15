import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Validators } from "@angular/forms";
import { v4 as uuidv4 } from 'uuid';
import { MatDialog } from "@angular/material/dialog";
import { FieldType, FormConfig } from "../models/form-config.models";
import { InfoDialogComponent } from "../shared/components/info-dialog/info-dialog/info-dialog.component";
import { Person } from "../models/person.models";


@Injectable({
    providedIn: 'root'
})

export class PersonsService {

    private dataList: Person[] = [];
    private dataListSubject: BehaviorSubject<Person[]> = new BehaviorSubject<Person[]>([]);
    public data$: Observable<Person[]> = this.dataListSubject.asObservable();

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
                })
        }
    }

    getFormFields() {
        return this.formFields.slice()
    }
}