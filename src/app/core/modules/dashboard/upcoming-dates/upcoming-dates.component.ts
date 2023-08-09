import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Alert } from 'src/app/core/models/alert.models';
import { AlertService } from 'src/app/core/services/alert.service';
import { TimeAlertService } from 'src/app/core/services/time-alert.service';

@Component({
  selector: 'app-upcoming-dates',
  templateUrl: './upcoming-dates.component.html',
  styleUrls: ['./upcoming-dates.component.scss']
})
export class UpcomingDatesComponent implements OnInit {

  alerts: Alert[];
  private subscription: Subscription;

  constructor(
    private timeAlertService: TimeAlertService,
    private alertService: AlertService,
    ) {
    this.alertService.getAlerts('cars');
   }

  ngOnInit(): void {
    this.subscription = this.alertService.categoryAlerts$
    .subscribe((data: Alert[]) => {
      this.alerts = data;
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
