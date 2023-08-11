import { Injectable } from "@angular/core";
import { Alert } from "../models/alert.models";
import { EntityAlertMap, EntityCategory } from "../models/category-list.models";
import { BehaviorSubject, forkJoin } from "rxjs";
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn: "root"
})

export class GlobalAlertService {

    private alertsUrl = 'https://dashboard-e83c7-default-rtdb.firebaseio.com';

    carsAlerts: Alert[] = [];
    private carsAlertsSubject = new BehaviorSubject<Alert[]>([]);
    carsAlerts$ = this.carsAlertsSubject.asObservable();

    personsAlerts: Alert[] = [];
    private personsAlertsSubject = new BehaviorSubject<Alert[]>([]);
    personsAlerts$ = this.personsAlertsSubject.asObservable();

    petsAlerts: Alert[] = [];
    private petsAlertsSubject = new BehaviorSubject<Alert[]>([]);
    petsAlerts$ = this.petsAlertsSubject.asObservable();

    allAlerts: EntityAlertMap = {
        "persons": [],
        "cars": [],
        "pets": [],
        "events": [],
        "food": [],
        "todos": []
    };
    private allAlertsSubject = new BehaviorSubject<EntityAlertMap>(this.allAlerts);
    allAlerts$ = this.allAlertsSubject.asObservable();

    constructor(
        private http: HttpClient,
    ) { }

    getGlobalAlerts() {
        const persons$ = this.http.get<Alert[]>(`${this.alertsUrl}/persons/personsAlerts.json`);
        const cars$ = this.http.get<Alert[]>(`${this.alertsUrl}/cars/carsAlerts.json`);
        const pets$ = this.http.get<Alert[]>(`${this.alertsUrl}/pets/petsAlerts.json`);
      
        forkJoin([persons$, cars$, pets$]).subscribe(([persons, cars, pets]) => {
          this.personsAlerts = persons ? persons : [];
          this.carsAlerts = cars ? cars : [];
          this.petsAlerts = pets ? pets : [];
      
          this.personsAlertsSubject.next(persons);
          this.carsAlertsSubject.next(cars);
          this.petsAlertsSubject.next(pets);
      
          this.allAlerts["persons"] = persons ? persons : [];
          this.allAlerts["cars"] = cars ? cars : [];
          this.allAlerts["pets"] = pets ? pets : [];
      
          this.allAlertsSubject.next(this.allAlerts);
          console.log('forkJoin', this.allAlerts)
        });
      }
}