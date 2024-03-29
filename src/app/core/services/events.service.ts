import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, of, switchMap } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Validators } from "@angular/forms";
import { v4 as uuidv4 } from 'uuid';
import { MatDialog } from "@angular/material/dialog";
import { FieldType, FormConfig } from "../models/form-config.models";
import { InfoDialogComponent } from "../shared/components/info-dialog/info-dialog/info-dialog.component";
import { CalendarEvent } from "../models/event.models";
import { EntityCategory } from "../models/category-list.models";
import { TimeAlertService } from "./time-alert.service";
import { AlertsService } from "./alerts.service";
import { DaysAlertService } from "./days-alert.service";


@Injectable({
    providedIn: 'root'
})

export class EventsService {

    private dataList: CalendarEvent[] = [];
    private dataListSubject: BehaviorSubject<CalendarEvent[]> = new BehaviorSubject<CalendarEvent[]>([]);
    public data$: Observable<CalendarEvent[]> = this.dataListSubject.asObservable();
    title: EntityCategory = "events";

    private formFields: FormConfig[] = [
        {
            type: FieldType.Select, label: 'Category', name: 'category', options: [
                'Deadline',
                'Visit',
                'Holidays',
                'Occasions',
                'Entertainment',
                'Education',
                'Work'
            ], validations: [Validators.required]
        },
        { type: FieldType.Text, label: 'Title', name: 'name', validations: [Validators.required] },
        { type: FieldType.Date, label: 'Date', name: 'date', validations: [Validators.required] },
        { type: FieldType.Time, label: 'Time', name: 'time' },
        { type: FieldType.Textarea, label: 'Description', name: 'description' },
        {
            type: FieldType.Select, label: 'Importance', name: 'importance', options: [
                'Low',
                'Medium',
                'High',
            ], validations: [Validators.required]
        },
    ];

    private url: string;

    constructor(
        private http: HttpClient,
        public dialog: MatDialog,
        private timeAlertService: TimeAlertService,
        private alertsService: AlertsService,
        private daysAlertService: DaysAlertService,
    ) {
        this.url = `/events/eventsList.json`;
    };

    getList() {
        this.http.get<CalendarEvent[]>(this.url)
            .subscribe({
                next: (response: CalendarEvent[] | null) => {
                    const data = response !== null ? response : [];
                    this.dataList = data;
                    this.dataListSubject.next(data);
                    this.alertsService.deleteAllAlerts(this.title);
                    this.addAlerts(data);
                },
                error: () => {
                    this.dialog.open(InfoDialogComponent, {
                        data: {
                            title: 'Error',
                            description: 'Error while fetching events data',
                            type: 'error'
                        }
                    });
                }
            })
    }

    addUniqueId(): string {
        return uuidv4();
    }

    add(item: CalendarEvent) {
        const clonedList = [...this.dataList, item];
        this.dataListSubject.next(clonedList);
        this.http.put<CalendarEvent[]>(this.url, clonedList)
            .subscribe(() => {
                this.dataList = clonedList;
                this.addAlerts([item]);
            })
    }

    update(updatedItem: CalendarEvent) {
        const clonedList = [...this.dataList];
        const index = clonedList.findIndex(x => x.id === updatedItem.id)
        if (index !== -1) {
            clonedList[index] = updatedItem;
            this.dataListSubject.next(clonedList);
            this.http.put<CalendarEvent[]>(this.url, clonedList)
                .subscribe(() => {
                    this.dataList = clonedList;
                    this.alertsService.deleteAlert(this.title, updatedItem.id)
                    this.addAlerts([updatedItem]);
                })
        }
    }

    delete(item: CalendarEvent) {
        const clonedList = [...this.dataList];
        const index = clonedList.findIndex(x => x.id === item.id);
        if (index !== -1) {
            clonedList.splice(index, 1);
            this.dataListSubject.next(clonedList);
            this.http.put<CalendarEvent[]>(this.url, clonedList)
                .subscribe(() => {
                    this.dataList = clonedList;
                    this.alertsService.deleteAlert(this.title, item.id)
                })
        }
    }

    getFormFields() {
        return this.formFields.slice()
    }

    addAlerts(data: CalendarEvent[]) {
        data.map(item => {
            const date = this.timeAlertService.getCountEndTime(item.date);
            this.checkTimeAlert(date, 'Event Date', item);
        })
    }

    checkTimeAlert(expirationDate: number, eventName: string, item: CalendarEvent): void {
        const needAlert = this.daysAlertService.checkTime(expirationDate);
        if (needAlert) {
            this.alertsService.addAlert(this.title, item.id, item.category, item.name, expirationDate, eventName);
        }
    }
}