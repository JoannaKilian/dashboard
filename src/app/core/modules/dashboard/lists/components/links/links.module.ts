import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { SharedModule } from 'src/app/core/shared/shared.module';
import { LinksRoutingModule } from './links-routing';
import { AddLinksDialogComponent } from './components/add-links-dialog/add-links-dialog.component';
import { UpdateLinksDialogComponent } from './components/update-links-dialog/update-links-dialog.component';
import { LinksFormComponent } from './components/links-form/links-form.component';
import { LinksComponent } from './links.component';



@NgModule({
  declarations: [
    LinksComponent,
    AddLinksDialogComponent,
    UpdateLinksDialogComponent,
    LinksFormComponent
  ],
  imports: [
    LinksRoutingModule,
    CommonModule,
    SharedModule,
    MatTabsModule,
    MatIconModule,
    MatDialogModule,
  ],
  exports: [

  ],
  providers: []
})
export class LinksModule {
}
