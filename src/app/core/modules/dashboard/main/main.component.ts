import { Component, OnInit } from '@angular/core';
import { Section } from "../../../models/sections.models";
import { ActivatedRoute, Router } from '@angular/router';
import { MenuService } from 'src/app/core/services/menu.service';
import { GlobalAlertService } from 'src/app/core/services/global-alerts.service';
import { Observable } from 'rxjs';
import { Alert } from 'src/app/core/models/alert.models';
import { EntityAlertMap } from 'src/app/core/models/category-list.models';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  carsAlerts$: Observable<Alert[]>;
  personsAlerts$: Observable<Alert[]>;
  petsAlerts$: Observable<Alert[]>;
  allAlerts$: Observable<EntityAlertMap>;

  sections: Section[];

  constructor(
    private router: Router,
    private menuService: MenuService,
    private globalAlertService: GlobalAlertService,
  ) { }

  ngOnInit(): void {
    this.sections = this.menuService.getSections();
    this.globalAlertService.getGlobalAlerts();
    this.carsAlerts$ = this.globalAlertService.carsAlerts$;
    this.personsAlerts$ = this.globalAlertService.personsAlerts$;
    this.petsAlerts$ = this.globalAlertService.petsAlerts$;
    this.allAlerts$ = this.globalAlertService.allAlerts$;
  }

  goToPage(value: string,) {
    this.menuService.setCurrentIndex(2);
    this.router.navigate([`/dashboard/lists/${value}`]);
  }

  getTooltipContent(alerts: Alert[]): string {
    if (alerts && alerts.length > 0) {
      const messages = alerts.map((alert, index) => `${index + 1}. ${alert.message.split(' ').slice(0, 2).join(' ')} - ${alert.name}`);
      return messages.join(', ');
    } else {
      return ''
    }
  }
}
