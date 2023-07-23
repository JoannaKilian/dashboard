import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ListsRoutingModule } from './lists-routing.module';
import { ListsComponent } from "./lists.component";
import { SharedModule } from "../../../shared/shared.module";
import { MatTabsModule } from '@angular/material/tabs';
import { PersonsComponent } from './components/persons/persons.component';
import { CarsComponent } from './components/cars/cars.component';
import { PetsComponent } from './components/pets/pets.component';
import { PersonDetailsComponent } from './components/persons/components/person-details/person-details.component';
import { MatIconModule } from '@angular/material/icon';
import { CarDetailsComponent } from './components/cars/components/car-details/car-details.component';
import { PetDetailsComponent } from './components/pets/components/person-details/pet-details.component';

@NgModule({
  declarations: [
    ListsComponent,
    PersonsComponent,
    CarsComponent,
    PetsComponent,
    PersonDetailsComponent,
    CarDetailsComponent,
    PetDetailsComponent
  ],
  imports: [
    CommonModule,
    ListsRoutingModule,
    SharedModule,
    MatTabsModule,
    MatIconModule,
  ],
  exports: [
    PersonDetailsComponent,
    CarDetailsComponent
  ],
  providers: []
})
export class ListsModule {
}
