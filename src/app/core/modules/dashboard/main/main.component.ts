import { Component, OnInit } from '@angular/core';
import { Section } from "../../../models/sections.models";
import { Router } from '@angular/router';
import { MenuService } from 'src/app/core/services/menu.service';
import { GlobalAlertService } from 'src/app/core/services/global-alerts.service';
import { Observable } from 'rxjs';
import { Alert } from 'src/app/core/models/alert.models';
import { EntityAlertMap } from 'src/app/core/models/category-list.models';
import { ColorService } from 'src/app/core/services/color.service';

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

  sections$: Observable<Section[]>;

  constructor(
    private router: Router,
    private menuService: MenuService,
    private globalAlertService: GlobalAlertService,
    private colorService: ColorService
  ) { }

  ngOnInit(): void {
    this.menuService.getSections();
    this.sections$ = this.menuService.sections$;
    this.globalAlertService.getGlobalAlerts();
    this.carsAlerts$ = this.globalAlertService.carsAlerts$;
    this.personsAlerts$ = this.globalAlertService.personsAlerts$;
    this.petsAlerts$ = this.globalAlertService.petsAlerts$;
    this.allAlerts$ = this.globalAlertService.allAlerts$;
    this.colorService.setColor();
  }

  goToPage(value: string,) {
    this.menuService.setCurrentIndex(1);
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
