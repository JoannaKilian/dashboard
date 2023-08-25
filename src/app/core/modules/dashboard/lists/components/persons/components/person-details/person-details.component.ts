import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Alert } from 'src/app/core/models/alert.models';
import { EntityCategory } from 'src/app/core/models/category-list.models';
import { Person } from 'src/app/core/models/person.models';
import { AlertService } from 'src/app/core/services/alert.service';
import { TimeAlertService } from 'src/app/core/services/time-alert.service';

@Component({
  selector: 'app-person-details',
  templateUrl: './person-details.component.html',
  styleUrls: ['./person-details.component.scss']
})
export class PersonDetailsComponent implements OnInit, OnDestroy {

  @Input() details: Person;
  @Input() alerts$: Observable<Alert[]>;
  @Input() title: EntityCategory;

  age: number;
  birthdayDate: number;
  nameDay: number;
  alerts: Alert[];
  subscription: Subscription = new Subscription();

  constructor(
    private timeAlertService: TimeAlertService,
    private alertService: AlertService
  ) { }

  ngOnInit(): void {
    this.age = this.timeAlertService.getAge(this.details.dateOfBirth);
    this.birthdayDate = this.timeAlertService.getDaysToAnniversary(this.details.dateOfBirth);
    console.log('this.details.dateOfBirth, this.birthdayDate', this.details.dateOfBirth, this.birthdayDate)
    if (this.details.nameDay) {
      this.nameDay = this.timeAlertService.getDaysToAnniversary(this.details.nameDay);
      console.log('this.details.nameDay, this.nameDay', this.details.nameDay, this.nameDay)
    }

    this.subscription.add(this.alerts$.subscribe(data => {
      this.alerts = data;
    }));

    if (this.alerts?.length > 0) {
      this.updateTimeAlert(this.birthdayDate, 'Birthday');
    } else if(this.alerts?.length > 0 && this.details.nameDay){
      this.updateTimeAlert(this.nameDay, 'Name Day');
    }
  }

  updateTimeAlert(expirationDate: number, name: string): void {
    const needUpdate = this.alertService.isUpdateAlertNeeded(this.details.id, name, expirationDate);

    if (needUpdate && expirationDate <= 30) {
      this.alertService.updateAlert(this.title, this.details.id, this.details.name, this.details.surname, expirationDate, name);
    } else if (needUpdate) {
      this.alertService.deleteAlertByItem(this.title, this.details.id, name)
    }
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

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}

