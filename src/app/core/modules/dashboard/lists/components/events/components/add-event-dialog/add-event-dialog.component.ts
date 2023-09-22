import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { EntityCategory } from 'src/app/core/models/category-list.models';
import { CalendarEvent } from 'src/app/core/models/event.models';
import { EventsService } from 'src/app/core/services/events.service';

@Component({
  selector: 'app-add-event-dialog',
  templateUrl: './add-event-dialog.component.html',
  styleUrls: ['./add-event-dialog.component.scss']
})
export class AddEventDialogComponent implements OnInit {

  title: EntityCategory;
  newItem: CalendarEvent;

  constructor(
    public dialogRef: MatDialogRef<AddEventDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public dialogData: any,
    private dataService: EventsService,
  ) { }

  ngOnInit() {
    this.title = this.dialogData.title;
  }

  addHandler(item: CalendarEvent) {
    const id: string = this.dataService.addUniqueId();
    item.id = id;
    this.newItem = item
    this.dataService.add(this.newItem);
  }


}
