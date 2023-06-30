import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {MainRoutingModule} from './main-routing';
import {MainComponent} from "./main.component";
import {SharedModule} from "../../../shared/shared.module";
import {DashboardModule} from "../dashboard.module";

@NgModule({
  declarations: [
    MainComponent
  ],
    imports: [
        CommonModule,
        MainRoutingModule,
        SharedModule,
        DashboardModule
    ],
  providers: []
})
export class MainModule {
}
