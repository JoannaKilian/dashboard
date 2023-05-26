import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {StatisticRoutingModule} from './statistic-routing.module';
import {StatisticsComponent} from "./statistics.component";
import {MatIconModule} from "@angular/material/icon";
import {MatTableModule} from "@angular/material/table";
import {MatMenuModule} from "@angular/material/menu";
import {MatExpansionModule} from "@angular/material/expansion";
import {MatSortModule} from "@angular/material/sort";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatButtonModule} from "@angular/material/button";
import {SharedModule} from "../../../shared/shared.module";
// import { PaginationControlsModule } from 'ngx-pagination';

@NgModule({
  declarations: [
    StatisticsComponent
  ],
  imports: [
    CommonModule,
    StatisticRoutingModule,
    MatIconModule,
    MatTableModule,
    MatExpansionModule,
    MatSortModule,
    MatPaginatorModule,
    MatMenuModule,
    MatButtonModule,
    SharedModule,
    // PaginationControlsModule
  ],
  providers: []
})
export class StatisticModule {
}
