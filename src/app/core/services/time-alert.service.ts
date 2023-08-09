import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})

export class TimeAlertService {


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
    } else return 0;
  }
}
