import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Alert } from 'src/app/core/models/alert.models';
import { EntityCategory } from 'src/app/core/models/category-list.models';
import { CalendarEvent } from 'src/app/core/models/event.models';
import { AlertService } from 'src/app/core/services/alert.service';
import { TimeAlertService } from 'src/app/core/services/time-alert.service';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.scss']
})
export class EventDetailsComponent implements OnInit, OnDestroy {


  @Input() details: CalendarEvent;
  @Input() alerts$: Observable<Alert[]>;
  @Input() title: EntityCategory;

  date: number;
  alerts: Alert[];
  importanceLevels = ['Low', 'Medium', 'High'];
  subscription: Subscription = new Subscription();

  constructor(
    private timeAlertService: TimeAlertService,
    private alertService: AlertService
  ) { }

  ngOnInit(): void {
    this.date = this.timeAlertService.getCountEndTime(this.details.date);

    this.subscription.add(this.alerts$.subscribe(data => {
      this.alerts = data;
    }));

    if (this.alerts?.length > 0) {
      this.updateTimeAlert(this.date, 'Date');
    }
  }

  updateTimeAlert(expirationDate: number, name: string): void {
    const needUpdate = this.alertService.isUpdateAlertNeeded(this.details.id, name, expirationDate);

    if (needUpdate && expirationDate <= 30) {
      this.alertService.updateAlert(this.title, this.details.id, this.details.category, this.details.name, expirationDate, name);
    } else if (needUpdate) {
      this.alertService.deleteAlertByItem(this.title, this.details.id, name)
    }
  }

  getImportanceIcon(importance: string): string {
    switch (importance) {
      case "Low":
        return 'slow_motion_video low_priority';
      case "Medium":
        return 'child_friendly';
      case "High":
        return 'priority_high';
      default:
        return 'child_friendly';

    }
  }

ngOnDestroy(): void {
  this.subscription.unsubscribe();
}
}
