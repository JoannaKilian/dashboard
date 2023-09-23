import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { MatDialog } from "@angular/material/dialog";
import { InfoDialogComponent } from "../shared/components/info-dialog/info-dialog/info-dialog.component";


@Injectable({
    providedIn: 'root'
})

export class DaysAlertService {

    private daysAlert: number = 1;
    private daysAlertSubject: BehaviorSubject<number> = new BehaviorSubject<number>(1);
    public daysAlert$: Observable<number> = this.daysAlertSubject.asObservable();

    private url: string;

    constructor(
        private http: HttpClient,
        public dialog: MatDialog,
    ) {
        this.url = `/settings/daysAlert.json`;
    };

    setDaysAlert() {
        this.http.get<number>(this.url)
            .subscribe({
                next: (response: number | null) => {
                    const data = response !== null ? response : 1;
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

    getDaysAlert(): number {
        return this.daysAlert;
    }

    changeDaysAlert(i: number) {
        const root = document.documentElement;
        switch (i) {
            case 0:
                root.style.setProperty('--color-base-dark', '#111111');
                root.style.setProperty('--color-base', '#111111');
                root.style.setProperty('--color-base-light', '#283e41');
                root.style.setProperty('--color-background', '#dddddd');
                break;
            case 1:
                root.style.setProperty('--color-base-dark', '#164B60');
                root.style.setProperty('--color-base', '#1B6B93');
                root.style.setProperty('--color-base-light', '#4FC0D0');
                root.style.setProperty('--color-background', '#FFFFFF');
                break;
            case 2:
                root.style.setProperty('--color-base-dark', '#9B59B6');
                root.style.setProperty('--color-base', '#603F83');
                root.style.setProperty('--color-base-light', '#A96BAE');
                root.style.setProperty('--color-background', '#E5E5E5');
                break;
            case 3:
                root.style.setProperty('--color-base-dark', '#3D9970');
                root.style.setProperty('--color-base', '#60CC99');
                root.style.setProperty('--color-base-light', '#7AE5B9');
                root.style.setProperty('--color-background', '#E5E5E5');
                break;
            case 4:
                root.style.setProperty('--color-base-dark', '#eeeeee');
                root.style.setProperty('--color-base', '#eeeeee');
                root.style.setProperty('--color-base-light', '#a0cbd1');
                root.style.setProperty('--color-background', '#444444');
                break;
        }
        this.http.put<number>(this.url, i)
            .subscribe(() => {
                this.daysAlert = i;
            })
    }
}