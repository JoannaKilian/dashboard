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

  setTimeAlert(category: "Persons" | "Cars" | "Pets", title: string, subtitle: string, days: number): void {
    const message = {
      category,
      message: `${title} ${subtitle} - significant deadline ends in ${days} days`
    }
    if (!this.isMessageDuplicate(message)) {
      this.alerts.push(message);
      this.alertSubject.next(this.alerts);
    }
  }

  isMessageDuplicate(newMessage: Alert): boolean {
    return this.alerts.some((message) => JSON.stringify(message) === JSON.stringify(newMessage));
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

  getAge(birthDate: string){
    const currentDate = new Date();
    const dateOfBirthAsDate = new Date(birthDate);
    if (dateOfBirthAsDate < currentDate) {
      const ageDelta = currentDate.getTime() - dateOfBirthAsDate.getTime();
      return Math.floor(ageDelta / (1000 * 60 * 60 * 24 * 365));
    } else return 0
  }
}
