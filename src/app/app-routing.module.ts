import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: "", pathMatch: "full", redirectTo: "dashboard" },
  // {
  //   path: "auth",
  //   loadChildren: () => import("./modules/auth/auth.module").then(x => x.AuthModule)
  // },
  {
    path: "dashboard",
    loadChildren: () => import("./core/modules/dashboard/dashboard.module").then(x => x.DashboardModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
