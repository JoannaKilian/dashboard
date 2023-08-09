import { Injectable } from '@angular/core';
import { Alert } from '../models/alert.models';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable()

export class AlertService {

  private alerts: Alert[] = [];
  private alertsListSubject: BehaviorSubject<Alert[]> = new BehaviorSubject<Alert[]>([]);
  categoryAlerts$: Observable<Alert[]> = this.alertsListSubject.asObservable();

  private alertsUrl = 'https://dashboard-e83c7-default-rtdb.firebaseio.com';

  constructor(
    private http: HttpClient,
  ) { }

  getAlerts(categoryName: string) {
    this.http.get<Alert[]>(`${this.alertsUrl}/${categoryName}/${categoryName}Alerts.json`)
      .subscribe((response: Alert[] | null) => {
        const data = response !== null ? response : [];
        this.alerts = data;
        this.alertsListSubject.next(data);
      }
      );
  }

  addAlert(
    categoryName: string,
    parentId: string,
    title: string,
    subtitle: string,
    days: number,
    name: string) {

    const alertMessage: Alert = {
      name,
      parentId,
      message: `${title} ${subtitle} - deadline of ${name} ends in ${days} days`
    };

    const isDuplicate = this.alerts.some(alert => alert.parentId === alertMessage.parentId && alert.name === alertMessage.name);
    if (isDuplicate) return;
    this.alerts.push(alertMessage);

    this.http.put<Alert[]>(`${this.alertsUrl}/${categoryName}/${categoryName}Alerts.json`, this.alerts)
      .subscribe(() => {
        this.alertsListSubject.next([...this.alerts]);
      })
  }

  deleteAlert(categoryName: string, parentId: string) {
    const newArray = this.alerts.filter(alert => alert.parentId !== parentId);
    this.http.put<Alert[]>(`${this.alertsUrl}/${categoryName}/${categoryName}Alerts.json`, newArray)
      .subscribe(() => {
        this.alerts = newArray;
        this.alertsListSubject.next([...this.alerts]);
      })
  }

  deleteAlertByItem(categoryName: string, parentId: string, name: string) {
    const index = this.alerts.findIndex(alert => alert.parentId === parentId && alert.name === name);
    this.alerts.splice(index, 1);

    this.http.put<Alert[]>(`${this.alertsUrl}/${categoryName}/${categoryName}Alerts.json`, this.alerts)
      .subscribe(() => {
        this.alertsListSubject.next([...this.alerts]);
      })
  }

  updateAlert(
    categoryName: string,
    parentId: string,
    title: string,
    subtitle: string,
    days: number,
    name: string) {

    const alertMessage: Alert = {
      name,
      parentId,
      message: `${title} ${subtitle} - deadline of ${name} ends in ${days} days`
    };

    const index = this.alerts.findIndex(alert => alert.parentId === parentId && alert.name === name)

    if (index !== -1) {
      this.alerts[index] = alertMessage;
      this.http.put<Alert[]>(`${this.alertsUrl}/${categoryName}/${categoryName}Alerts.json`, this.alerts)
        .subscribe(() => {
          this.alertsListSubject.next([...this.alerts]);
        })
    }
  }
}
