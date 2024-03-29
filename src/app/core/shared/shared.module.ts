import { NgModule } from '@angular/core';
import { BaseComponent } from "./layout/base/base.component";
import { RouterModule } from "@angular/router";
import { ComingSoonComponent } from './components/coming-soon/coming-soon.component';
import { MatIconModule } from "@angular/material/icon";
import { MenuComponent } from './layout/menu/menu.component';
import { CommonModule } from "@angular/common";
import { TitleComponent } from "./components/title/title.component";
import { Stars } from "./components/stars/stars";
import { HeaderComponent } from "./layout/header/header.component";
import { MatTableModule } from '@angular/material/table';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSortModule } from '@angular/material/sort';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { TableComponent } from './components/table/table.component';
import { AddButtonComponent } from './layout/add-button/add-button.component';
import { ProgressComponent } from './components/progress/progress.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CreateFormComponent } from './components/form/create-form/create-form.component';
import { FormControlComponent } from './components/form/form-control/form-control.component';
import { ReactiveFormsModule } from '@angular/forms';
import { InfoDialogComponent } from './components/info-dialog/info-dialog/info-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ProgressBarComponent } from './layout/progress-bar/progress-bar.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { VarticalMenuComponent } from './layout/vertical-menu/vartical-menu.component';

@NgModule({
  declarations: [
    BaseComponent,
    ComingSoonComponent,
    MenuComponent,
    VarticalMenuComponent,
    TitleComponent,
    Stars,
    HeaderComponent,
    TableComponent,
    AddButtonComponent,
    ProgressComponent,
    CreateFormComponent,
    FormControlComponent,
    InfoDialogComponent,
    ProgressBarComponent,
  ],
  exports: [
    BaseComponent,
    ComingSoonComponent,
    TitleComponent,
    Stars,
    HeaderComponent,
    TableComponent,
    AddButtonComponent,
    ProgressComponent,
    CreateFormComponent,
    FormControlComponent,
    InfoDialogComponent,
    ProgressBarComponent,
  ],
  imports: [
    RouterModule,
    MatIconModule,
    CommonModule,
    MatTableModule,
    MatExpansionModule,
    MatSortModule,
    MatMenuModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatProgressBarModule,
    MatTooltipModule
  ]
})
export class SharedModule {
}
