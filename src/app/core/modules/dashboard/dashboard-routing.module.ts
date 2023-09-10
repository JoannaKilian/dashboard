import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {BaseComponent} from "../../shared/layout/base/base.component";


const routes: Routes = [
  {
    path: "", component: BaseComponent, children: [
      {path: "", pathMatch: "full", redirectTo: "main"},
      {path: "main", loadChildren: () => import("./main/main.module").then(x => x.MainModule)},
      {path: "settings", loadChildren: () => import("./custom/settings.module").then(x => x.SettingsModule)},
      {path: "lists", loadChildren: () => import("./lists/lists.module").then(x => x.ListsModule)},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule {
}
