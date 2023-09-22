import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { EntityCategory } from 'src/app/core/models/category-list.models';
import { Person } from 'src/app/core/models/person.models';
import { TimeAlertService } from 'src/app/core/services/time-alert.service';

@Component({
  selector: 'app-person-details',
  templateUrl: './person-details.component.html',
  styleUrls: ['./person-details.component.scss']
})
export class PersonDetailsComponent implements OnInit, OnDestroy {

  @Input() details: Person;
  @Input() title: EntityCategory;

  age: number;
  birthdayDate: number;
  nameDay: number;
  subscription: Subscription = new Subscription();

  constructor(
    private timeAlertService: TimeAlertService,
  ) { }

  ngOnInit(): void {
    this.age = this.timeAlertService.getAge(this.details.dateOfBirth);
    this.birthdayDate = this.timeAlertService.getDaysToAnniversary(this.details.dateOfBirth);
    if (this.details.nameDay) {
      this.nameDay = this.timeAlertService.getDaysToAnniversary(this.details.nameDay);
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

