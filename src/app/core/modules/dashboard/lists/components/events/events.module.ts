import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { SharedModule } from 'src/app/core/shared/shared.module';
import { EventsRoutingModule } from './events-routing';
import { EventFormComponent } from './components/event-form/event-form.component';
import { AddEventDialogComponent } from './components/add-event-dialog/add-event-dialog.component';
import { UpdateEventDialogComponent } from './components/update-event-dialog/update-event-dialog.component';
import { EventDetailsComponent } from './components/event-details/event-details.component';
import { EventsComponent } from './events.component';


@NgModule({
  declarations: [
    EventsComponent,
    EventFormComponent,
    EventDetailsComponent,
    AddEventDialogComponent,
    UpdateEventDialogComponent,
  ],
  imports: [
    EventsRoutingModule,
    CommonModule,
    SharedModule,
    MatTabsModule,
    MatIconModule,
    MatDialogModule,
  ],
  exports: [
    EventDetailsComponent
  ],
  providers: []
})
export class EventsModule {
}
