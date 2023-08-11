import { Component, OnInit } from '@angular/core';
import { Section } from "../../../models/sections.models";
import { Router } from '@angular/router';
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

  sections: Section[] = [
    { title: 'persons', value: 'persons', icon: 'person' },
    { title: 'cars', value: 'cars', icon: 'directions_car' },
    { title: 'pets', value: 'pets', icon: 'pets' },
    { title: 'events', value: 'events', icon: 'event_available' },
    { title: 'food', value: 'food', icon: 'fastfood' },
    { title: 'todos', value: 'todos', icon: 'event' },
  ];

  constructor(
    private router: Router,
    private menuService: MenuService,
    private globalAlertService: GlobalAlertService,
  ) { }

ngOnInit(): void {
  this.globalAlertService.getGlobalAlerts();
  this.carsAlerts$ = this.globalAlertService.carsAlerts$;
  this.personsAlerts$ = this.globalAlertService.personsAlerts$;
  this.petsAlerts$ = this.globalAlertService.petsAlerts$;
  this.allAlerts$ = this.globalAlertService.allAlerts$;
}

  goToPage(value: string,) {
    this.menuService.setCurrentIndex(2);
    this.router.navigate([`/dashboard/lists`], { queryParams: { tab: value } });
  }
}
