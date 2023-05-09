import { NgModule } from '@angular/core';
import {BaseComponent} from "./layout/base/base.component";

@NgModule({
  declarations: [
    BaseComponent
  ],
  exports: [
    BaseComponent
  ],
  imports: []
})
export class SharedModule { }
