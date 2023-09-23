import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, Subject } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { MatDialog } from "@angular/material/dialog";
import { InfoDialogComponent } from "../shared/components/info-dialog/info-dialog/info-dialog.component";


@Injectable({
    providedIn: 'root'
})

export class DaysAlertService {

    private daysAlert: number = 30;
    private url: string;

    constructor(
        private http: HttpClient,
        public dialog: MatDialog,
    ) {
        this.url = `/settings/daysAlert.json`;
        this.setDaysAlert();
    };

    setDaysAlert() {
        this.http.get<number>(this.url)
            .subscribe({
                next: (response: number | null) => {
                    const data = response !== null ? response : 30;
                    this.daysAlert = data;
                }
            })
    }

    changeDaysAlert(i: number) {
        this.daysAlert = i;
        this.http.put<number>(this.url, i)
    }
    
    getDaysAlerts(){
        return this.daysAlert;
    }
}