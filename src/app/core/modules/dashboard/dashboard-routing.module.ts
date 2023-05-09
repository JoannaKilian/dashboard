import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {BaseComponent} from "../../shared/layout/base/base.component";


const routes: Routes = [
  {
    path: "", component: BaseComponent, children: [
      { path: "", pathMatch: "full", redirectTo: "main" },
      { path: "main", loadChildren: () => import("./main/main.module").then(x => x.MainModule) },
      { path: "dashboard", loadChildren: () => import("./favourite/favourite.module").then(x => x.FavouriteModule) },
      { path: "statistic", loadChildren: () => import("./statistics/statistic.module").then(x => x.StatisticModule) },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule {
}
