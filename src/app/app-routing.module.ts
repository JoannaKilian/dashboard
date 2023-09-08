import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './core/auth/auth.component';
import { AuthGuard } from './core/guards/guards/auth.guard';

const routes: Routes = [
  { path: "login", component: AuthComponent },
  {
    path: "dashboard",
    canActivate: [AuthGuard],
    loadChildren: () => import("./core/modules/dashboard/dashboard.module").then(x => x.DashboardModule)
  },
  { path: "", pathMatch: "full", redirectTo: "login" },
  { path: '**', redirectTo: "login" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
