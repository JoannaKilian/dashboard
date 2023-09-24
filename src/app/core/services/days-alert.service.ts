import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { MatDialog } from "@angular/material/dialog";


@Injectable({
    providedIn: 'root'
})

export class DaysAlertService {

    private daysAlert: number = 30;
    private daysAlertSubject: BehaviorSubject<number> = new BehaviorSubject<number>(30);
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
                    this.daysAlert = data;
                    this.daysAlertSubject.next(data);
                }
            })
    }

    changeDaysAlert(i: number) {
        this.daysAlert = i;
        this.daysAlertSubject.next(i);
        this.http.put<number>(this.url, i).subscribe()
    }

    checkTime(days: number): boolean {
        return days <= this.daysAlert ? true : false
    }
}