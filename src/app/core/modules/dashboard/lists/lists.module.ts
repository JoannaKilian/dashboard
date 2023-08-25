import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ListsRoutingModule } from './lists-routing.module';
import { ListsComponent } from "./lists.component";
import { SharedModule } from "../../../shared/shared.module";
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';


@NgModule({
  declarations: [
    ListsComponent,
  ],
  imports: [
    CommonModule,
    ListsRoutingModule,
    SharedModule,
    MatTabsModule,
    MatIconModule,
    MatDialogModule,
  ],
  exports: [
  ],
  providers: []
})
export class ListsModule {
}
