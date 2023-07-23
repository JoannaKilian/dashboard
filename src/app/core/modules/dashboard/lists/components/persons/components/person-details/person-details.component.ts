import { Component, Input, OnInit } from '@angular/core';
import { Person } from 'src/app/core/models/person.models';
import { TimeAlertService } from 'src/app/core/services/time-alert.service.service';

@Component({
  selector: 'app-person-details',
  templateUrl: './person-details.component.html',
  styleUrls: ['./person-details.component.scss']
})
export class PersonDetailsComponent implements OnInit {

  @Input() personDetails: Person;

  age: number;
  daysUntilBirthday: number;
  toWeedingAnniversary: number;

  constructor(private timeAlertService: TimeAlertService) { }

  ngOnInit(): void {
    this.age = this.timeAlertService.getAge(this.personDetails.dateOfBirth);
    this.daysUntilBirthday = this.timeAlertService.getDaysToAnniversary(this.personDetails.dateOfBirth);
    if(this.personDetails.weedingAnniversary){
      this.toWeedingAnniversary = this.timeAlertService.getDaysToAnniversary(this.personDetails.weedingAnniversary)
    }
    this.checkTimeAlert(this.daysUntilBirthday);
    this.checkTimeAlert(this.toWeedingAnniversary);
  }

  getIconAge(): string {
    if (this.age < 1) {
      return 'child_friendly'
    } else if (this.age >= 1 && this.age < 18) {
      return 'child_care'
    } else {
      return 'person'
    }
  }

  checkTimeAlert(days: number): void {
    if (days <= 30) {
      this.timeAlertService.setTimeAlert("Persons", this.personDetails.name, this.personDetails.surname, days);
    }
  }
}

