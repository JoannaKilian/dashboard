import {NgModule} from '@angular/core';
import {BaseComponent} from "./layout/base/base.component";
import {RouterModule} from "@angular/router";
import { ComingSoonComponent } from './layout/coming-soon/coming-soon.component';
import {MatIconModule} from "@angular/material/icon";
import { MenuComponent } from './layout/menu/menu.component';

@NgModule({
  declarations: [
    BaseComponent,
    ComingSoonComponent,
    MenuComponent,
  ],
  exports: [
    BaseComponent
  ],
  imports: [
    RouterModule,
    MatIconModule
  ]
})
export class SharedModule {
}
