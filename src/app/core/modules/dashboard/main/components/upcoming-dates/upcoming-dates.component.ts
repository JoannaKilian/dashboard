import { Component, OnInit } from '@angular/core';
import { switchMap } from 'rxjs';
import { Alert } from 'src/app/core/models/alert.models';
import { EntityAlertMap } from 'src/app/core/models/category-list.models';
import { AlertsService } from 'src/app/core/services/alerts.service';

@Component({
  selector: 'app-upcoming-dates',
  templateUrl: './upcoming-dates.component.html',
  styleUrls: ['./upcoming-dates.component.scss']
})
export class UpcomingDatesComponent implements OnInit {

  alerts: Alert[] = [];
  loading: boolean = true;

  constructor(
    private alertsService: AlertsService
    ) {}

  ngOnInit(): void {
    this.alertsService.allAlerts$.pipe(
      switchMap((response: EntityAlertMap) => {
        const data = response !== null ? response : {
          "persons": [],
          "cars": [],
          "pets": [],
          "events": [],
        };
        this.alerts = this.combineAlerts(data);
        this.loading = false;
        return this.alertsService.allAlerts$;
      })
    ).subscribe();
  }

  combineAlerts(data: EntityAlertMap): Alert[] {
    const combinedAlerts: Alert[] = [];
    for (const category in data) {
      combinedAlerts.push(...data[category]);
    }
    combinedAlerts.sort((a, b) => a.deadline - b.deadline);
    return combinedAlerts;
  }

  ngOnDestroy() {

  }
}
