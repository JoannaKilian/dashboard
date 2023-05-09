import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {statisticRoutingModule} from './statistic-routing';
import {StatisticsComponent} from "./statistics.component";

@NgModule({
  declarations: [
    StatisticsComponent
  ],
  imports: [
    CommonModule,
    statisticRoutingModule
  ],
  providers: []
})
export class StatisticModule {
}
