import { Injectable } from '@angular/core';
import { Alert } from '../models/alert.models';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TimeAlertService {

  private alertsList: Alert[] = [];
  private alertsListSubject: BehaviorSubject<Alert[]> = new BehaviorSubject<Alert[]>([]);
  timeAlert$: Observable<Alert[]> = this.alertsListSubject.asObservable();

  private alertsUrl = 'https://dashboard-e83c7-default-rtdb.firebaseio.com/alerts.json';

  constructor(
    private http: HttpClient,
  ) { }

  setTimeAlert(category: "Persons" | "Cars" | "Pets", id: string, title: string, subtitle: string, days: number): void {

    const message: Alert = {
      id,
      category,
      message: `${title} ${subtitle} - significant deadline ends in ${days} days`
    };
    const clonedAlertsList = [...this.alertsList];
    const index = clonedAlertsList.findIndex(x => x.id === id);

    if (index !== -1) {
      clonedAlertsList[index] = message;
    } else {
      clonedAlertsList.push(message);
    }
    this.http.put<Alert[]>(this.alertsUrl, clonedAlertsList)
      .subscribe(() => {
        this.alertsList = clonedAlertsList;
        this.alertsListSubject.next([...this.alertsList]);
      })
  }

  deleteTimeAlert(id: string) {
    const clonedAlertsList = [...this.alertsList];
    const index = clonedAlertsList.findIndex(x => x.id === id);
    if (index !== -1) {
      clonedAlertsList.splice(index, 1);
      this.http.put<Alert[]>(this.alertsUrl, clonedAlertsList)
        .subscribe(() => {
          this.alertsList = clonedAlertsList;
          this.alertsListSubject.next([...this.alertsList]);
        })
    } else {
      return;
    }
  }


  getCountEndTime(date: string): number {
    const currentDate = new Date();
    const endDate = new Date(date);
    const timeDifference = endDate.getTime() - currentDate.getTime();
    const daysDifference = timeDifference / (1000 * 3600 * 24);
    return Math.ceil(daysDifference);
  }

  getDaysToAnniversary(date: string): number {
    const currentDate = new Date();
    const anniversaryThisYear = new Date(date);
    anniversaryThisYear.setFullYear(currentDate.getFullYear());

    if (anniversaryThisYear.getTime() < currentDate.getTime()) {
      anniversaryThisYear.setFullYear(currentDate.getFullYear() + 1);
    }

    const timeDifference = anniversaryThisYear.getTime() - currentDate.getTime();
    const daysDifference = timeDifference / (1000 * 3600 * 24);
    return Math.ceil(daysDifference);
  }

  getAge(birthDate: string) {
    const currentDate = new Date();
    const dateOfBirthAsDate = new Date(birthDate);
    if (dateOfBirthAsDate < currentDate) {
      const ageDelta = currentDate.getTime() - dateOfBirthAsDate.getTime();
      return Math.floor(ageDelta / (1000 * 60 * 60 * 24 * 365));
    } else return 0
  }
}
