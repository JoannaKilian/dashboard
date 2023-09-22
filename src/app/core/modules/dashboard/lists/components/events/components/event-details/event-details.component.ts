import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { EntityCategory } from 'src/app/core/models/category-list.models';
import { CalendarEvent } from 'src/app/core/models/event.models';
import { TimeAlertService } from 'src/app/core/services/time-alert.service';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.scss']
})
export class EventDetailsComponent implements OnInit, OnDestroy {


  @Input() details: CalendarEvent;
  @Input() title: EntityCategory;

  date: number;
  importanceLevels = ['Low', 'Medium', 'High'];
  subscription: Subscription = new Subscription();

  constructor(
    private timeAlertService: TimeAlertService,
  ) { }

  ngOnInit(): void {
    this.date = this.timeAlertService.getCountEndTime(this.details.date);
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
