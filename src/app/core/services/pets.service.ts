import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Validators } from "@angular/forms";
import { v4 as uuidv4 } from 'uuid';
import { MatDialog } from "@angular/material/dialog";
import { FieldType, FormConfig } from "../models/form-config.models";
import { InfoDialogComponent } from "../shared/components/info-dialog/info-dialog/info-dialog.component";
import { Pet } from "../models/pet.models";
import { TimeAlertService } from "./time-alert.service";
import { AlertsService } from "./alerts.service";
import { EntityCategory } from "../models/category-list.models";


@Injectable({
    providedIn: 'root'
})

export class PetsService {

    private dataList: Pet[] = [];
    private dataListSubject: BehaviorSubject<Pet[]> = new BehaviorSubject<Pet[]>([]);
    public data$: Observable<Pet[]> = this.dataListSubject.asObservable();
    title: EntityCategory = "pets"

    private formFields: FormConfig[] = [
        { type: FieldType.Text, label: 'Name', name: 'name', validations: [Validators.required] },
        {
            type: FieldType.Select, label: 'Sex', name: 'sex', options: [
                'Male',
                'Female',
            ], validations: [Validators.required]
        },
        {
            type: FieldType.Select, label: 'Species', name: 'species', options: [
                'Dog',
                'Cat',
                'Rabbit',
                'Guinea Pig',
                'Hamster',
                'Bird',
                'Fish',
                'Turtle',
                'Ferret',
                'Horse',
                'Rat',
                'Mouse'
            ], validations: [Validators.required]
        },
        { type: FieldType.Text, label: 'Breed', name: 'breed' },
        { type: FieldType.Date, label: 'Date Of Birth', name: 'dateOfBirth', validations: [Validators.required] },
        { type: FieldType.Date, label: 'Vaccination Date', name: 'vaccinationDate' },
    ];

    private url: string;

    constructor(
        private http: HttpClient,
        public dialog: MatDialog,
        private timeAlertService: TimeAlertService,
        private alertsService: AlertsService
    ) {
        this.url = `/pets/petsList.json`;
    };

    getList() {
        this.http.get<Pet[]>(this.url)
            .subscribe({
                next: (response: Pet[] | null) => {
                    const data = response !== null ? response : [];
                    this.dataList = data;
                    this.addAlerts(data);
                    this.dataListSubject.next(data);
                },
                error: () => {
                    this.dialog.open(InfoDialogComponent, {
                        data: {
                            title: 'Error',
                            description: 'Error while fetching pets data',
                            type: 'error'
                        }
                    });
                }
            })
    }

    addUniqueId(): string {
        return uuidv4();
    }

    add(item: Pet) {
        const clonedList = [...this.dataList, item];
        this.dataListSubject.next(clonedList);
        this.http.put<Pet[]>(this.url, clonedList)
            .subscribe(() => {
                this.dataList = clonedList;
                this.addAlerts([item]);
            })
    }

    update(updatedItem: Pet) {
        const clonedList = [...this.dataList];
        const index = clonedList.findIndex(x => x.id === updatedItem.id)
        if (index !== -1) {
            clonedList[index] = updatedItem;
            this.dataListSubject.next(clonedList);
            this.http.put<Pet[]>(this.url, clonedList)
                .subscribe(() => {
                    this.dataList = clonedList;
                    this.alertsService.deleteAlert(this.title, updatedItem.id)
                    this.addAlerts([updatedItem]);
                })
        }
    }

    delete(item: Pet) {
        const clonedList = [...this.dataList];
        const index = clonedList.findIndex(x => x.id === item.id);
        if (index !== -1) {
            clonedList.splice(index, 1);
            this.dataListSubject.next(clonedList);
            this.http.put<Pet[]>(this.url, clonedList)
                .subscribe(() => {
                    this.dataList = clonedList;
                    this.alertsService.deleteAlert(this.title, item.id)
                })
        }
    }

    getFormFields() {
        return this.formFields.slice()
    }

    addAlerts(data: Pet[]) {
        data.map(item => {
            const birthdayDate = this.timeAlertService.getDaysToAnniversary(item.dateOfBirth);
            this.checkTimeAlert(birthdayDate, 'Birthday', item);
            if (item.vaccinationDate) {
                const vaccinationDate = this.timeAlertService.getCountEndTime(item.vaccinationDate);
                this.checkTimeAlert(vaccinationDate, 'Vaccination Date', item);
            }
        })
    }

    checkTimeAlert(expirationDate: number, eventName: string, item: Pet): void {
        if (expirationDate <= 30) {
            this.alertsService.addAlert("pets", item.id, item.species, item.name, expirationDate, eventName);
        }
    }

    getAverageLifespan(animal: Pet): number {
        switch (animal.species) {
            case 'Dog':
                return 12;
            case 'Cat':
                return 14;
            case 'Rabbit':
                return 10;
            case 'Guinea Pig':
                return 6;
            case 'Hamster':
                return 3;
            case 'Bird':
                return 10;
            case 'Fish':
                return 6;
            case 'Turtle':
                return 30;
            case 'Ferret':
                return 8;
            case 'Horse':
                return 28;
            case 'Rat':
                return 3;
            case 'Mouse':
                return 2;
            default:
                return -1;
        }
    }
}