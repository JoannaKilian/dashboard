import { Component, Input, OnInit } from '@angular/core';
import { Observable, switchMap } from 'rxjs';
import { Alert } from 'src/app/core/models/alert.models';
import { EntityAlertMap } from 'src/app/core/models/category-list.models';
import { GlobalAlertService } from 'src/app/core/services/global-alerts.service';

@Component({
  selector: 'app-upcoming-dates',
  templateUrl: './upcoming-dates.component.html',
  styleUrls: ['./upcoming-dates.component.scss']
})
export class UpcomingDatesComponent implements OnInit {

  alerts: Alert[] = [];
  loading: boolean = true;

  constructor(
    private globalAlertService: GlobalAlertService,
    ) {}

  ngOnInit(): void {
    this.globalAlertService.getGlobalAlerts();
    this.globalAlertService.allAlerts$.pipe(
      switchMap((response: EntityAlertMap) => {
        const data = response !== null ? response : {
          "persons": [],
          "cars": [],
          "pets": [],
          "events": [],
          "food": [],
          "todos": []
        };
        this.alerts = this.combineAlerts(data);
        this.loading = false;
        return this.globalAlertService.allAlerts$;
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
