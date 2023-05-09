import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FavouriteRoutingModule} from './favourite-routing';
import {FavouriteComponent} from "./favourite.component";

@NgModule({
  declarations: [
    FavouriteComponent
  ],
  imports: [
    CommonModule,
    FavouriteRoutingModule
  ],
  providers: []
})
export class FavouriteModule {
}
