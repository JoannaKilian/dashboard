import { Injectable, OnDestroy } from "@angular/core";
import { BehaviorSubject, Observable, Subscription } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { v4 as uuidv4 } from 'uuid';
import { MatDialog } from "@angular/material/dialog";
import { InfoDialogComponent } from "../shared/components/info-dialog/info-dialog/info-dialog.component";
import { Note } from "../models/note.models";
import { UserService } from "./user.service";
import { environment } from "src/environments/environment";


@Injectable({
    providedIn: 'root'
})

export class ColorService implements OnDestroy {

    private color: number = 1;
    private colorSubject: BehaviorSubject<number> = new BehaviorSubject<number>(1);
    public color$: Observable<number> = this.colorSubject.asObservable();

    private url: string;
    uid: string | null;
    subscription: Subscription = new Subscription();

    constructor(
        private http: HttpClient,
        public dialog: MatDialog,
        private userService: UserService,
    ) {
        this.uid = userService.getUid();
        this.url = `${environment.firebaseConfig.databaseURL}/users/${this.uid}/settings/color.json`;
    };

    setColor() {
        this.subscription.add(this.http.get<number>(this.url)
            .subscribe({
                next: (response: number | null) => {
                    const data = response !== null ? response : 1;
                    this.changeColor(data);
                    this.color = data;
                    this.colorSubject.next(data);
                },
                error: () => {
                    this.dialog.open(InfoDialogComponent, {
                        data: {
                            title: 'Error',
                            description: 'Error while fetching theme color',
                            type: 'error'
                        }
                    });
                }
            }))
    }

    getColor() : number{
        return this.color;
    }

    changeColor(i: number) {
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
        this.subscription.add(this.http.put<number>(this.url, i)
        .subscribe(() => {
            this.color = i;
        }))
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }
}