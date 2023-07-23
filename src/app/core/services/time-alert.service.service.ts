import { EventEmitter, Injectable } from '@angular/core';
import { Alert } from '../models/alert.models';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TimeAlertService {

  alerts: Alert[] = [];
  alertSubject: BehaviorSubject<Alert[]> = new BehaviorSubject<Alert[]>([]);
  timeAlert$: Observable<Alert[]> = this.alertSubject.asObservable();

  constructor() { }

  emitTimeAlert(category: "Persons" | "Cars" | "Pets", title: string, subtitle: string, days: number): void {
    const message = {
      category,
      message: `${title} ${subtitle} - significant deadline ends in ${days} days`
    }
    this.alerts.push(message);
    this.alertSubject.next(this.alerts);
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
}
