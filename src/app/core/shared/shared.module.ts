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

@NgModule({
  declarations: [
    BaseComponent,
    ComingSoonComponent,
    MenuComponent,
    TitleComponent,
    Stars,
    HeaderComponent
  ],
  exports: [
    BaseComponent,
    ComingSoonComponent,
    TitleComponent,
    Stars,
    HeaderComponent
  ],
  imports: [
    RouterModule,
    MatIconModule,
    CommonModule,
  ]
})
export class SharedModule {
}
