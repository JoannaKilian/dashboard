import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { CarsComponent } from './cars.component';
import { CarDetailsComponent } from './components/car-details/car-details.component';
import { CarFormComponent } from './components/car-form/car-form.component';
import { UpdateCarDialogComponent } from './components/update-car-dialog/update-car-dialog.component';
import { AddCarDialogComponent } from './components/add-car-dialog/add-car-dialog.component';
import { SharedModule } from 'src/app/core/shared/shared.module';
import { CarsRoutingModule } from './cars-routing';



@NgModule({
  declarations: [
    CarsComponent,
    CarDetailsComponent,
    CarFormComponent,
    UpdateCarDialogComponent,
    AddCarDialogComponent,
  ],
  imports: [
    CarsRoutingModule,
    CommonModule,
    SharedModule,
    MatTabsModule,
    MatIconModule,
    MatDialogModule,
  ],
  exports: [
    CarDetailsComponent,
  ],
  providers: []
})
export class CarsModule {
}
