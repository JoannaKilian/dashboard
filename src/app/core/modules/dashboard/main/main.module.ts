import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MainRoutingModule } from './main-routing';
import { MainComponent } from "./main.component";
import { SharedModule } from "../../../shared/shared.module";
import { DashboardModule } from "../dashboard.module";
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { LinksComponent } from './components/links/links.component';
import { LinkFormComponent } from './components/links/components/link-form/link-form.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { UpdateLinkDialogComponent } from './components/links/components/update-link-dialog/update-link-dialog.component';
import { AddLinkDialogComponent } from './components/links/components/add-link-dialog/add-link-dialog.component';
import { BillsComponent } from './components/bills/bills.component';
import { AddBillDialogComponent } from './components/bills/components/add-bill-dialog/add-bill-dialog.component';
import { UpdateBillDialogComponent } from './components/bills/components/update-bill-dialog/update-bill-dialog.component';
import { BillFormComponent } from './components/bills/components/bill-form/bill-form.component';

@NgModule({
  declarations: [
    MainComponent,
    LinksComponent,
    UpdateLinkDialogComponent,
    AddLinkDialogComponent,
    LinkFormComponent,
    BillsComponent,
    AddBillDialogComponent,
    UpdateBillDialogComponent,
    BillFormComponent
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    SharedModule,
    MatIconModule,
    DashboardModule,
    MatTooltipModule,
    MatDialogModule,
    MatMenuModule,
    MatSlideToggleModule
  ],
  providers: []
})
export class MainModule {
}
