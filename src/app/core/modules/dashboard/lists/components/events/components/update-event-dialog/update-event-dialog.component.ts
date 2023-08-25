import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { EntityCategory } from 'src/app/core/models/category-list.models';
import { CalendarEvent } from 'src/app/core/models/event.models';
import { AlertService } from 'src/app/core/services/alert.service';
import { EventsService } from 'src/app/core/services/events.service';
import { TimeAlertService } from 'src/app/core/services/time-alert.service';

@Component({
  selector: 'app-update-event-dialog',
  templateUrl: './update-event-dialog.component.html',
  styleUrls: ['./update-event-dialog.component.scss']
})
export class UpdateEventDialogComponent implements OnInit{

  title: EntityCategory;
  event: CalendarEvent;
  alertService: AlertService;

  constructor(
    public dialogRef: MatDialogRef<UpdateEventDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public dialogData: any,
    private dataService: EventsService,
    private timeAlertService: TimeAlertService,
  ) { }

  ngOnInit() {
    this.title = this.dialogData.title;
    this.event = this.dialogData.event;
    this.alertService = this.dialogData.alertService;
  }

  updateHandler(updateItem: CalendarEvent) {
    updateItem.id = this.event.id;
    const date = this.timeAlertService.getDaysToAnniversary(updateItem.date);
    this.updateTimeAlert(date, 'Date', updateItem);
  
    this.dataService.update(updateItem);
  }

  updateTimeAlert(expirationDate: number, name: string, item: CalendarEvent): void {
    if (expirationDate <= 30) {
      this.alertService.updateAlert(this.title, this.event.id,  item.category, item.name, expirationDate, name);
    } else {
      this.alertService.deleteAlertByItem(this.title, this.event.id, name);
    }
  }
}
