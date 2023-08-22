import { Injectable, OnDestroy } from '@angular/core';
import { Alert } from '../models/alert.models';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { EntityCategory } from '../models/category-list.models';
import { MatDialog } from '@angular/material/dialog';
import { InfoDialogComponent } from '../shared/components/info-dialog/info-dialog/info-dialog.component';

@Injectable()

export class AlertService implements OnDestroy {

  private alerts: Alert[] = [];
  private alertsListSubject: BehaviorSubject<Alert[]> = new BehaviorSubject<Alert[]>([]);
  categoryAlerts$: Observable<Alert[]> = this.alertsListSubject.asObservable();

  private alertsUrl = 'https://dashboard-e83c7-default-rtdb.firebaseio.com';
  subscription: Subscription = new Subscription();

  constructor(
    private http: HttpClient,
    public dialog: MatDialog,
  ) { }

  getAlerts(categoryName: EntityCategory) {
    this.subscription.add(this.http.get<Alert[]>(`${this.alertsUrl}/${categoryName}/${categoryName}Alerts.json`)
      .subscribe({
        next: (response: Alert[] | null) => {
          const data = response !== null ? response : [];
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
      }))
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

    const updatedAlerts = [...this.alerts, alertMessage];
    this.alerts = updatedAlerts;
    this.alertsListSubject.next(updatedAlerts);

    const originalAlerts = [...this.alerts];

    this.subscription.add(this.http.put<Alert[]>(`${this.alertsUrl}/${categoryName}/${categoryName}Alerts.json`, updatedAlerts)
    .subscribe({
      next: () => console.log('Alerts updated on server'),
      error: () => {
        this.dialog.open(InfoDialogComponent, {
          data: {
            title: 'Error',
            description: `Error while adding alert dla: ${name} - ${title} ${subtitle}`,
            type: 'error'
          }
        });
        this.alerts = originalAlerts;
        this.alertsListSubject.next(originalAlerts);
      }
    }))
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

    const copiedAlerts = [...this.alerts];

    const index = copiedAlerts.findIndex(alert => alert.parentId === parentId && alert.name === name);
    if (index !== -1) {
      copiedAlerts[index] = alertMessage;
      this.alerts = copiedAlerts;
      this.alertsListSubject.next(copiedAlerts);
      const originalAlerts = [...this.alerts];

      this.subscription.add(this.http.put<Alert[]>(`${this.alertsUrl}/${categoryName}/${categoryName}Alerts.json`, copiedAlerts)
      .subscribe({
        next: () => console.log('Alerts update on server'),
        error: () => {
          this.dialog.open(InfoDialogComponent, {
            data: {
              title: 'Error',
              description: 'Error while update alerts',
              type: 'error'
            }
          });
          this.alerts = originalAlerts;
          this.alertsListSubject.next(originalAlerts);
        }
      }
      ))
    } else this.addAlert(categoryName, parentId, title, subtitle, deadline, name)
  }

  isUpdateAlertNeeded(
    parentId: string,
    name: string,
    deadline: number,
  ): boolean {

    const copiedAlerts = [...this.alerts];
    const index = copiedAlerts.findIndex(alert => alert.parentId === parentId && alert.name === name);
    return copiedAlerts[index]?.deadline !== deadline;
  }

  deleteAlert(categoryName: EntityCategory, parentId: string) {
    const newArray = this.alerts.filter(alert => alert.parentId !== parentId);
    this.alerts = newArray;
    this.alertsListSubject.next(newArray);

    const originalAlerts = [...this.alerts];

    this.subscription.add(this.http.put<Alert[]>(`${this.alertsUrl}/${categoryName}/${categoryName}Alerts.json`, newArray)
    .subscribe({
      next: () => console.log('Alerts delete on server'),
      error: () => {
        this.dialog.open(InfoDialogComponent, {
          data: {
            title: 'Error',
            description: 'Error while delete alerts',
            type: 'error'
          }
        });
        this.alerts = originalAlerts;
        this.alertsListSubject.next(originalAlerts);
      }
    }
    ))
  }


  deleteAlertByItem(
    categoryName: EntityCategory,
    parentId: string,
    name: string) {

    const copiedAlerts = [...this.alerts];
    const index = copiedAlerts.findIndex(alert => alert.parentId === parentId && alert.name === name);
    if (index !== -1) {
      copiedAlerts.splice(index, 1);
    }

    this.alerts = copiedAlerts;
    this.alertsListSubject.next(copiedAlerts);
    const originalAlerts = [...this.alerts];

    this.subscription.add(this.http.put<Alert[]>(`${this.alertsUrl}/${categoryName}/${categoryName}Alerts.json`, copiedAlerts)
    .subscribe({
      next: () => console.log('Alert delete on server'),
      error: () => {
        this.dialog.open(InfoDialogComponent, {
          data: {
            title: 'Error',
            description: 'Error while delete alert',
            type: 'error'
          }
        });
        this.alerts = originalAlerts;
        this.alertsListSubject.next(originalAlerts);
      }
    }
    ))
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
