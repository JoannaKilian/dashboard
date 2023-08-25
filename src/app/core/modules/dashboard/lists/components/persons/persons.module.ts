import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { SharedModule } from 'src/app/core/shared/shared.module';
import { PersonsRoutingModule } from './persons-routing';
import { PersonDetailsComponent } from './components/person-details/person-details.component';
import { PersonsComponent } from './persons.component';
import { PersonFormComponent } from './components/person-form/person-form.component';
import { UpdatePersonDialogComponent } from './components/update-person-dialog/update-person-dialog.component';
import { AddPersonDialogComponent } from './components/add-person-dialog/add-person-dialog.component';



@NgModule({
  declarations: [
    PersonsComponent,
    PersonDetailsComponent,
    PersonFormComponent,
    UpdatePersonDialogComponent,
    AddPersonDialogComponent,
  ],
  imports: [
    PersonsRoutingModule,
    CommonModule,
    SharedModule,
    MatTabsModule,
    MatIconModule,
    MatDialogModule,
  ],
  exports: [
    PersonDetailsComponent,
  ],
  providers: []
})
export class PersonsModule {
}
