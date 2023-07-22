import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TimeAlertService {

  timeAlertEvent = new EventEmitter();

  constructor() { }

  emitTimeAlert(category: "Persons" | "Cars" | "Pets", title: string, subtitle: string, days: number): void {
    const message = {
      category,
      message: `${title} ${subtitle} - significant deadline ends in ${days} days`
    }
    this.timeAlertEvent.emit(message);
  }

  getCountEndTime(date: string): number{
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
