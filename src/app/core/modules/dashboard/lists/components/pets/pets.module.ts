import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { SharedModule } from 'src/app/core/shared/shared.module';
import { PetDetailsComponent } from './components/pet-details/pet-details.component';
import { PetFormComponent } from './components/pet-form/pet-form.component';
import { PetRoutingModule } from './pets-routing';
import { AddPetDialogComponent } from './components/add-pet-dialog/add-pet-dialog.component';
import { UpdatePetDialogComponent } from './components/update-pet-dialog/update-pet-dialog.component';
import { PetsComponent } from './pets.component';



@NgModule({
  declarations: [
    PetsComponent,
    PetFormComponent,
    PetDetailsComponent,
    AddPetDialogComponent,
    UpdatePetDialogComponent
  ],
  imports: [
    PetRoutingModule,
    CommonModule,
    SharedModule,
    MatTabsModule,
    MatIconModule,
    MatDialogModule,
  ],
  exports: [
    PetDetailsComponent,
  ],
  providers: []
})
export class PetsModule {
}
