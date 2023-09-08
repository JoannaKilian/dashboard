import { Injectable } from "@angular/core";
import { Alert } from "../models/alert.models";
import { EntityAlertMap, EntityCategory } from "../models/category-list.models";
import { BehaviorSubject, catchError, forkJoin, throwError } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { InfoDialogComponent } from "../shared/components/info-dialog/info-dialog/info-dialog.component";
import { MatDialog } from "@angular/material/dialog";
import { environment } from "src/environments/environment";
import { UserService } from "./user.service";

@Injectable({
    providedIn: "root"
})

export class GlobalAlertService {

    private alertsUrl = `${environment.firebaseConfig.databaseURL}`;

    carsAlerts: Alert[] = [];
    private carsAlertsSubject = new BehaviorSubject<Alert[]>([]);
    carsAlerts$ = this.carsAlertsSubject.asObservable();

    personsAlerts: Alert[] = [];
    private personsAlertsSubject = new BehaviorSubject<Alert[]>([]);
    personsAlerts$ = this.personsAlertsSubject.asObservable();

    petsAlerts: Alert[] = [];
    private petsAlertsSubject = new BehaviorSubject<Alert[]>([]);
    petsAlerts$ = this.petsAlertsSubject.asObservable();

    eventsAlerts: Alert[] = [];
    private eventsAlertsSubject = new BehaviorSubject<Alert[]>([]);
    eventsAlerts$ = this.petsAlertsSubject.asObservable();

    allAlerts: EntityAlertMap = {
        "persons": [],
        "events": [],
        "cars": [],
        "pets": [],
    };
    private allAlertsSubject = new BehaviorSubject<EntityAlertMap>(this.allAlerts);
    allAlerts$ = this.allAlertsSubject.asObservable();

    uid: string | null;

    constructor(
        private http: HttpClient,
        public dialog: MatDialog,
        private userService: UserService,
    ) {
        this.uid = userService.getUid();
     }

    getGlobalAlerts() {
        const persons$ = this.http.get<Alert[]>(`${this.alertsUrl}/users/${this.uid}/persons/personsAlerts.json`);
        const events$ = this.http.get<Alert[]>(`${this.alertsUrl}/users/${this.uid}/events/eventsAlerts.json`);
        const cars$ = this.http.get<Alert[]>(`${this.alertsUrl}/users/${this.uid}/cars/carsAlerts.json`);
        const pets$ = this.http.get<Alert[]>(`${this.alertsUrl}/users/${this.uid}/pets/petsAlerts.json`);
      
        forkJoin([persons$, cars$, pets$, events$])
        .pipe(
            catchError(() => {
                this.dialog.open(InfoDialogComponent, {
                    data: {
                        title: 'Error',
                        description: 'Error while fetching global alerts',
                        type: 'error'
                    }
                });
                return throwError('Failed to fetch alerts');
            })
        )
        .subscribe(([persons, cars, pets, events]) => {
          this.personsAlerts = persons ? persons : [];
          this.eventsAlerts = events ? events : [];
          this.carsAlerts = cars ? cars : [];
          this.petsAlerts = pets ? pets : [];
      
          this.personsAlertsSubject.next(persons);
          this.eventsAlertsSubject.next(events);
          this.carsAlertsSubject.next(cars);
          this.petsAlertsSubject.next(pets);
      
          this.allAlerts["persons"] = persons ? persons : [];
          this.allAlerts["events"] = events ? events : [];
          this.allAlerts["cars"] = cars ? cars : [];
          this.allAlerts["pets"] = pets ? pets : [];
      
          this.allAlertsSubject.next(this.allAlerts);
        });
      }
}