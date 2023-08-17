import { Injectable } from '@angular/core';
import { Alert } from '../models/alert.models';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { EntityCategory } from '../models/category-list.models';
import { MatDialog } from '@angular/material/dialog';
import { InfoDialogComponent } from '../shared/components/info-dialog/info-dialog/info-dialog.component';
import { v4 as uuidv4 } from 'uuid';

@Injectable()

export class AlertService {

  private alerts: Alert[] = [];
  private alertsListSubject: BehaviorSubject<Alert[]> = new BehaviorSubject<Alert[]>([]);
  categoryAlerts$: Observable<Alert[]> = this.alertsListSubject.asObservable();

  private alertsUrl = 'https://dashboard-e83c7-default-rtdb.firebaseio.com';

  constructor(
    private http: HttpClient,
    public dialog: MatDialog,
  ) { }

  getAlerts(categoryName: EntityCategory) {
    console.log('getAlerts from alert service 1');
    this.http.get<Alert[]>(`${this.alertsUrl}/${categoryName}/${categoryName}Alerts.json`)
      .subscribe({
        next: (response: Alert[] | null) => {
          const data = response !== null ? response : [];
          console.log('getAlerts from alert service 2', data);
          this.alerts = data;
          this.alertsListSubject.next(data);
        },
        error: () => {
          this.dialog.open(InfoDialogComponent, {
            data: {
              title: 'Error',
              description: 'Error while fetching alerts',
              type: 'error'
            }
          });
        }
      });
  }

  addAlert(
    categoryName: EntityCategory,
    parentId: string,
    title: string,
    subtitle: string,
    deadline: number,
    name: string) {
    console.log('add alert:', name, title)
    const uniqueId = uuidv4();

    const alertMessage: Alert = {
      id: uniqueId,
      name,
      parentId,
      deadline,
      message: `${title} ${subtitle} - deadline of ${name} ends in ${deadline} days`
    };

    const isDuplicate = this.alerts.some(alert => alert.parentId === alertMessage.parentId && alert.name === alertMessage.name);
    if (isDuplicate) return;
    const updatedAlerts = [...this.alerts, alertMessage];
    this.alertsListSubject.next(updatedAlerts);

    this.http.put<Alert[]>(`${this.alertsUrl}/${categoryName}/${categoryName}Alerts.json`, updatedAlerts)
      .subscribe(() => {
        this.alerts = updatedAlerts;
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
    console.log('delete alert by item- this.alerts 1', this.alerts, name)
    const index = this.alerts.findIndex(alert => alert.parentId === parentId && alert.name === name);
    this.alerts.splice(index, 1);
    this.alertsListSubject.next([...this.alerts]);
    console.log('delete alert by item- this.alerts 2', this.alerts, name)

    this.http.put<Alert[]>(`${this.alertsUrl}/${categoryName}/${categoryName}Alerts.json`, this.alerts)
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

    console.log('update alerts - this.alerts 1', this.alerts);

    const index = this.alerts.findIndex(alert => alert.parentId === parentId && alert.name === name);
    this.alertsListSubject.next([...this.alerts]);
    console.log('update alerts - this.alerts 2', this.alerts);

    if (index !== -1) {
      this.alerts[index] = alertMessage;
      this.http.put<Alert[]>(`${this.alertsUrl}/${categoryName}/${categoryName}Alerts.json`, this.alerts)
    }
  }
}
