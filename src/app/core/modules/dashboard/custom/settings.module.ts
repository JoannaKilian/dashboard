import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from "../../../shared/shared.module";
import { SettingsComponent } from './settings.component';
import { SettingsRoutingModule } from './settings-routing';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [
    SettingsComponent
  ],
  imports: [
    CommonModule,
    SettingsRoutingModule,
    SharedModule,
    MatIconModule,
  ],
  providers: []
})
export class SettingsModule {
}
