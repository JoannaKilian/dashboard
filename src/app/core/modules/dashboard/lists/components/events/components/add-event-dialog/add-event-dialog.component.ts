import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { EntityCategory } from 'src/app/core/models/category-list.models';
import { CalendarEvent } from 'src/app/core/models/event.models';
import { AlertService } from 'src/app/core/services/alert.service';
import { EventsService } from 'src/app/core/services/events.service';
import { TimeAlertService } from 'src/app/core/services/time-alert.service';

@Component({
  selector: 'app-add-event-dialog',
  templateUrl: './add-event-dialog.component.html',
  styleUrls: ['./add-event-dialog.component.scss']
})
export class AddEventDialogComponent implements OnInit {

  title: EntityCategory;
  alertService: AlertService;
  newItem: CalendarEvent;

  constructor(
    public dialogRef: MatDialogRef<AddEventDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public dialogData: any,
    private dataService: EventsService,
    private timeAlertService: TimeAlertService,
  ) { }

  ngOnInit() {
    this.title = this.dialogData.title;
    this.alertService = this.dialogData.alertService;
  }

  addHandler(item: CalendarEvent) {

    const id: string = this.dataService.addUniqueId();
    item.id = id;
    this.newItem = item

    const date = this.timeAlertService.getCountEndTime(item.date);
    this.checkTimeAlert(date, 'Date');

    this.dataService.add(this.newItem);
  }

  checkTimeAlert(expirationDate: number, name: string): void {
    if (expirationDate <= 30) {
      this.alertService.addAlert(this.title, this.newItem.id, this.newItem.category, this.newItem.name, expirationDate, name);
    }
  }
}
