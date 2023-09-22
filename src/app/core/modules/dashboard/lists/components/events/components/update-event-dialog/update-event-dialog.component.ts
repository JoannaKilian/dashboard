import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { EntityCategory } from 'src/app/core/models/category-list.models';
import { CalendarEvent } from 'src/app/core/models/event.models';
import { EventsService } from 'src/app/core/services/events.service';

@Component({
  selector: 'app-update-event-dialog',
  templateUrl: './update-event-dialog.component.html',
  styleUrls: ['./update-event-dialog.component.scss']
})
export class UpdateEventDialogComponent implements OnInit{

  title: EntityCategory;
  event: CalendarEvent;

  constructor(
    public dialogRef: MatDialogRef<UpdateEventDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public dialogData: any,
    private dataService: EventsService,
  ) { }

  ngOnInit() {
    this.title = this.dialogData.title;
    this.event = this.dialogData.event;
  }

  updateHandler(updateItem: CalendarEvent) {
    updateItem.id = this.event.id;
    this.dataService.update(updateItem);
  }
}
