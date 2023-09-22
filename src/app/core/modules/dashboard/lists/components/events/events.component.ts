import { Component, OnDestroy, OnInit } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';
import { Observable, Subscription } from 'rxjs';
import { Alert } from 'src/app/core/models/alert.models';
import { InfoDialogComponent } from 'src/app/core/shared/components/info-dialog/info-dialog/info-dialog.component';
import { EntityCategory, SectionNumber } from 'src/app/core/models/category-list.models';
import { Section } from 'src/app/core/models/sections.models';
import { MenuService } from 'src/app/core/services/menu.service';
import { CalendarEvent } from 'src/app/core/models/event.models';
import { AddEventDialogComponent } from './components/add-event-dialog/add-event-dialog.component';
import { UpdateEventDialogComponent } from './components/update-event-dialog/update-event-dialog.component';
import { EventsService } from 'src/app/core/services/events.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss'],
})
export class EventsComponent implements OnInit, OnDestroy {
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
  ) { }

  ngOnInit(): void {
    this.getSectionInfo(SectionNumber.Events);
    this.dataService.getList();
    this.data$ = this.dataService.data$;
  }

  getSectionInfo(index: number) {
    this.menuService.getSections();
    this.sections = this.menuService.takeSections();
    this.title = this.sections[index].title;
    const foundedSection = this.sections.find(section => section.title === this.title);
    if (foundedSection) {
      this.icon = foundedSection.icon;
    }
  }

  addDialog() {
    this.dialog.open(AddEventDialogComponent, {
      width: '500px',
      data: {
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
        this.dataService.delete(item);
      }
    }))
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
