import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FavouriteRoutingModule} from './favourite-routing';
import {FavouriteComponent} from "./favourite.component";
import {SharedModule} from "../../../shared/shared.module";

@NgModule({
  declarations: [
    FavouriteComponent
  ],
    imports: [
        CommonModule,
        FavouriteRoutingModule,
        SharedModule
    ],
  providers: []
})
export class FavouriteModule {
}
