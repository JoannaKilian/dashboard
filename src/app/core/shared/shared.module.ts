import {NgModule} from '@angular/core';
import {BaseComponent} from "./layout/base/base.component";
import {RouterModule} from "@angular/router";

@NgModule({
  declarations: [
    BaseComponent
  ],
  exports: [
    BaseComponent
  ],
  imports: [
    RouterModule
  ]
})
export class SharedModule {
}
