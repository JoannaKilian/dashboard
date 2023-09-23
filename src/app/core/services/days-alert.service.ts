import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, Subject } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { MatDialog } from "@angular/material/dialog";
import { InfoDialogComponent } from "../shared/components/info-dialog/info-dialog/info-dialog.component";


@Injectable({
    providedIn: 'root'
})

export class DaysAlertService {

    private daysAlert: number;
    private daysAlertSubject: Subject<number> = new Subject<number>();
    public daysAlert$: Observable<number> = this.daysAlertSubject.asObservable();

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
                    this.changeDaysAlert(data);
                    this.daysAlert = data;
                    this.daysAlertSubject.next(data);
                },
                error: () => {
                    this.dialog.open(InfoDialogComponent, {
                        data: {
                            title: 'Error',
                            description: 'Error while fetching days alert',
                            type: 'error'
                        }
                    });
                }
            })
    }

    changeDaysAlert(i: number) {
        this.http.put<number>(this.url, i)
            .subscribe(() => {
                this.daysAlert = i;
                this.daysAlertSubject.next(i);
            })
    }
}