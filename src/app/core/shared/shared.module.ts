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
import { TableDetailsComponent } from './components/table-details/table-details.component';

@NgModule({
  declarations: [
    BaseComponent,
    ComingSoonComponent,
    MenuComponent,
    TitleComponent,
    Stars,
    HeaderComponent,
    TableComponent,
    TableDetailsComponent
  ],
  exports: [
    BaseComponent,
    ComingSoonComponent,
    TitleComponent,
    Stars,
    HeaderComponent,
    TableComponent,
    TableDetailsComponent
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
  ]
})
export class SharedModule {
}
