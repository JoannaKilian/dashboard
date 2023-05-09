import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {BaseComponent} from "../../shared/layout/base/base.component";


const routes: Routes = [
  {
    path: "", component: BaseComponent, children: [
      {}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule {
}
