import { Injectable } from '@angular/core';
import { Alert } from '../models/alert.models';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { EntityCategory } from '../models/category-list.models';

@Injectable()

export class AlertService {

  private alerts: Alert[] = [];
  private alertsListSubject: BehaviorSubject<Alert[]> = new BehaviorSubject<Alert[]>([]);
  categoryAlerts$: Observable<Alert[]> = this.alertsListSubject.asObservable();

  private alertsUrl = 'https://dashboard-e83c7-default-rtdb.firebaseio.com';

  constructor(
    private http: HttpClient,
  ) { }

  getAlerts(categoryName: EntityCategory) {
    this.http.get<Alert[]>(`${this.alertsUrl}/${categoryName}/${categoryName}Alerts.json`)
      .subscribe((response: Alert[] | null) => {
        const data = response !== null ? response : [];
        this.alerts = data;
        this.alertsListSubject.next(data);
      }
      );
  }

  addAlert(
    categoryName: EntityCategory,
    parentId: string,
    title: string,
    subtitle: string,
    deadline: number,
    name: string) {

    const alertMessage: Alert = {
      name,
      parentId,
      deadline,
      message: `${title} ${subtitle} - deadline of ${name} ends in ${deadline} days`
    };

    const isDuplicate = this.alerts.some(alert => alert.parentId === alertMessage.parentId && alert.name === alertMessage.name);
    if (isDuplicate) return;
    this.alerts.push(alertMessage);

    this.http.put<Alert[]>(`${this.alertsUrl}/${categoryName}/${categoryName}Alerts.json`, this.alerts)
      .subscribe(() => {
        this.alertsListSubject.next([...this.alerts]);
      })
  }

  deleteAlert(categoryName: EntityCategory, parentId: string) {
    const newArray = this.alerts.filter(alert => alert.parentId !== parentId);
    this.http.put<Alert[]>(`${this.alertsUrl}/${categoryName}/${categoryName}Alerts.json`, newArray)
      .subscribe(() => {
        this.alerts = newArray;
        this.alertsListSubject.next([...this.alerts]);
      })
  }

  deleteAlertByItem(categoryName: EntityCategory, parentId: string, name: string) {
    const index = this.alerts.findIndex(alert => alert.parentId === parentId && alert.name === name);
    this.alerts.splice(index, 1);

    this.http.put<Alert[]>(`${this.alertsUrl}/${categoryName}/${categoryName}Alerts.json`, this.alerts)
      .subscribe(() => {
        this.alertsListSubject.next([...this.alerts]);
      })
  }

  updateAlert(
    categoryName: EntityCategory,
    parentId: string,
    title: string,
    subtitle: string,
    deadline: number,
    name: string) {

    const alertMessage: Alert = {
      name,
      parentId,
      deadline,
      message: `${title} ${subtitle} - deadline of ${name} ends in ${deadline} days`
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
