import { Component, OnDestroy, OnInit } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';
import { Observable, Subscription } from 'rxjs';
import { AlertService } from 'src/app/core/services/alert.service';
import { Alert } from 'src/app/core/models/alert.models';
import { InfoDialogComponent } from 'src/app/core/shared/components/info-dialog/info-dialog/info-dialog.component';
import { EntityCategory } from 'src/app/core/models/category-list.models';
import { Section } from 'src/app/core/models/sections.models';
import { MenuService } from 'src/app/core/services/menu.service';
import { CalendarEvent } from 'src/app/core/models/event.models';
import { AddEventDialogComponent } from './components/add-event-dialog/add-event-dialog.component';
import { UpdateEventDialogComponent } from './components/update-event-dialog/update-event-dialog.component';
import { EventsService } from 'src/app/core/services/events.service';
import { StoreRootModule } from '@ngrx/store';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss'],
  providers: [AlertService]
})
export class EventsComponent implements OnInit, OnDestroy  {
  data$: Observable<CalendarEvent[]>;
  alerts$: Observable<Alert[]>;

  title: EntityCategory;
  icon: string;
  sections: Section[];
  headers: string[] = ['name', 'category'];
  subscription: Subscription = new Subscription();

  
  constructor(
    public dialog: MatDialog,
    private menuService: MenuService,
    private dataService: EventsService,
    private alertService: AlertService,
  ) { }

  ngOnInit(): void {
    this.getSectionInfo(3);
    this.alertService.getAlerts(this.title);
    this.dataService.getList();
    this.data$ = this.dataService.data$;
    this.alerts$ = this.alertService.categoryAlerts$
  }

  getSectionInfo(index: number){
    this.sections = this.menuService.getSections();
    this.title = this.sections[index].title;
    const foundedSection = this.sections.find(section => section.title === this.title);
    if(foundedSection){
      this.icon = foundedSection.icon;
    }
  }

  addDialog() {
    this.dialog.open(AddEventDialogComponent, {
      width: '500px',
      data: {
        alertService: this.alertService,
        title: this.title,
      }
    });
  }

  editDialog(event: CalendarEvent) {
    this.dialog.open(UpdateEventDialogComponent, {
      width: '500px',
      data: {
        title: this.title,
        event: event,
        alertService: this.alertService
      }
    });
  }

  deleteDialog(item: CalendarEvent) {
    const dialogRef = this.dialog.open(InfoDialogComponent, {
      data: {
        title: `Delete ${item.name}`,
        description: `Are you sure you want to delete ${item.category} - ${item.name}`,
        type: 'submit'
      }
    });
    this.subscription.add(dialogRef.afterClosed().subscribe((result) => {
      if (result === 'submit') {
        this.alertService.deleteAlert(this.title, item.id);
        this.dataService.delete(item);
      }
    }))
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
