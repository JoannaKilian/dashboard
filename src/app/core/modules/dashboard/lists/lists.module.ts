import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {ListsRoutingModule} from './lists-routing.module';
import {ListsComponent} from "./lists.component";
import {MatIconModule} from "@angular/material/icon";
import {MatTableModule} from "@angular/material/table";
import {MatMenuModule} from "@angular/material/menu";
import {MatExpansionModule} from "@angular/material/expansion";
import {MatSortModule} from "@angular/material/sort";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatButtonModule} from "@angular/material/button";
import {SharedModule} from "../../../shared/shared.module";

@NgModule({
  declarations: [
    ListsComponent
  ],
  imports: [
    CommonModule,
    ListsRoutingModule,
    MatIconModule,
    MatTableModule,
    MatExpansionModule,
    MatSortModule,
    MatPaginatorModule,
    MatMenuModule,
    MatButtonModule,
    SharedModule,
  ],
  providers: []
})
export class ListsModule {
}
