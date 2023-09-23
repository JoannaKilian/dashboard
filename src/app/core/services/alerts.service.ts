import { Injectable } from '@angular/core';
import { Alert } from '../models/alert.models';
import { BehaviorSubject } from 'rxjs';
import { EntityAlertMap, EntityCategory } from '../models/category-list.models';
import { MatDialog } from '@angular/material/dialog';

@Injectable({
  providedIn: "root"
})

export class AlertsService {

  allAlerts: EntityAlertMap = {
    "persons": [],
    "events": [],
    "cars": [],
    "pets": [],
  };
  private allAlertsSubject = new BehaviorSubject<EntityAlertMap>(this.allAlerts);
  allAlerts$ = this.allAlertsSubject.asObservable();

  constructor(
    public dialog: MatDialog,
  ) { }

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
      category: categoryName,
      deadline,
      message: `${title} ${subtitle} - deadline of ${name} ends in ${deadline} days`
    };

    const updatedAlerts = [...this.allAlerts[categoryName]];
    const alreadyExist = updatedAlerts.some(item => {
      return JSON.stringify(item.message) === JSON.stringify(alertMessage.message);
    })

    if (!alreadyExist) {
      updatedAlerts.push(alertMessage);
      this.allAlerts[categoryName] = updatedAlerts;
      this.allAlertsSubject.next(this.allAlerts);
    }
  }

  deleteAlert(categoryName: EntityCategory, parentId: string) {

    let updatedAlerts = [...this.allAlerts[categoryName]];
    const newArray = this.allAlerts[categoryName].filter(alert => alert.parentId !== parentId);
    updatedAlerts = newArray;
    this.allAlerts[categoryName] = updatedAlerts;
    this.allAlertsSubject.next(this.allAlerts);
  }

  deleteAllAlerts(categoryName: EntityCategory) {
    const updatedAlerts: Alert[] = [];
    this.allAlerts[categoryName] = updatedAlerts;
    this.allAlertsSubject.next(this.allAlerts);
  }

}
