import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListsComponent } from "./lists.component";

const routes: Routes = [
  {
    path: "", component: ListsComponent, children: [
      { path: "", pathMatch: "full", redirectTo: "persons" },
      { path: "persons", loadChildren: () => import("./components/persons/persons.module").then(x => x.PersonsModule) },
      { path: "cars", loadChildren: () => import("./components/cars/cars.module").then(x => x.CarsModule) },
      { path: "pets", loadChildren: () => import("./components/pets/pets.module").then(x => x.PetsModule) },
      { path: "events", loadChildren: () => import("./components/events/events.module").then(x => x.EventsModule) },
      { path: "links", loadChildren: () => import("./components/links/links.module").then(x => x.LinksModule) },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListsRoutingModule {
}
