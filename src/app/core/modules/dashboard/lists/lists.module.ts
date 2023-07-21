import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ListsRoutingModule } from './lists-routing.module';
import { ListsComponent } from "./lists.component";
import { SharedModule } from "../../../shared/shared.module";
import { MatTabsModule } from '@angular/material/tabs';
import { PersonsComponent } from './components/persons/persons.component';
import { CarsComponent } from './components/cars/cars.component';
import { PetsComponent } from './components/pets/pets.component';

@NgModule({
  declarations: [
    ListsComponent,
    PersonsComponent,
    CarsComponent,
    PetsComponent
  ],
  imports: [
    CommonModule,
    ListsRoutingModule,
    SharedModule,
    MatTabsModule
  ],
  providers: []
})
export class ListsModule {
}
