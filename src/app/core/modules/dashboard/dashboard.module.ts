import {NgModule} from '@angular/core';
import {DashboardRoutingModule} from './dashboard-routing.module';
import { StickersComponent } from './stickers/stickers.component';


@NgModule({
  declarations: [
    StickersComponent
  ],
  exports: [
    StickersComponent
  ],
  imports: [
    DashboardRoutingModule
  ]
})
export class DashboardModule {
}
