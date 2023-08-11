import { NgModule } from '@angular/core';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { StickersComponent } from './stickers/stickers.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { SharedModule } from '../../shared/shared.module';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UpcomingDatesComponent } from './upcoming-dates/upcoming-dates.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';


@NgModule({
  declarations: [
    StickersComponent,
    UpcomingDatesComponent,
  ],
  exports: [
    StickersComponent,
    UpcomingDatesComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    DragDropModule,
    MatIconModule,
    SharedModule,
    FormsModule,
    MatProgressSpinnerModule
  ]
})
export class DashboardModule {
}
