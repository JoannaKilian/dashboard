import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './core/auth/auth.component';

const routes: Routes = [
  { path: "login", component: AuthComponent },
  {
    path: "dashboard",
    loadChildren: () => import("./core/modules/dashboard/dashboard.module").then(x => x.DashboardModule)
  },
  { path: "", pathMatch: "full", redirectTo: "login" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
