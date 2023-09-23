import { Component, OnInit } from '@angular/core';
import { Section } from "../../../models/sections.models";
import { Router } from '@angular/router';
import { MenuService } from 'src/app/core/services/menu.service';
import { Observable } from 'rxjs';
import { Alert } from 'src/app/core/models/alert.models';
import { EntityAlertMap } from 'src/app/core/models/category-list.models';
import { ColorService } from 'src/app/core/services/color.service';
import { AlertsService } from 'src/app/core/services/alerts.service';
import { CarService } from 'src/app/core/services/cars.service';
import { EventsService } from 'src/app/core/services/events.service';
import { PersonsService } from 'src/app/core/services/persons.service';
import { PetsService } from 'src/app/core/services/pets.service';
import { DaysAlertService } from 'src/app/core/services/days-alert.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  allAlerts$: Observable<EntityAlertMap>;

  sections$: Observable<Section[]>;

  constructor(
    private router: Router,
    private menuService: MenuService,
    private alertsService: AlertsService,
    private colorService: ColorService,
    private daysAlertService: DaysAlertService,
    private carService: CarService,
    private eventsService: EventsService,
    private personsService: PersonsService,
    private petsService: PetsService,


  ) { }

  ngOnInit(): void {
    this.menuService.getSections();
    this.sections$ = this.menuService.sections$;
    this.carService.getList();
    this.eventsService.getList();
    this.personsService.getList();
    this.petsService.getList();
    this.allAlerts$ = this.alertsService.allAlerts$;
    this.colorService.setColor();
    this.daysAlertService.setDaysAlert();
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
