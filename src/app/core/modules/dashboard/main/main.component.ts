import { Component } from '@angular/core';
import { Section } from "../../../models/sections.models";
import { ActivatedRoute, Router } from '@angular/router';
import { MenuService } from 'src/app/core/services/menu.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {
  sections: Section[] = [
    { title: 'Persons', value: 'persons', icon: 'person' },
    { title: 'Cars', value: 'cars', icon: 'directions_car' },
    { title: 'Pets', value: 'pets', icon: 'pets' },
    { title: 'Events', value: 'events', icon: 'event_available' },
    { title: 'Food', value: 'food', icon: 'fastfood' },
    { title: 'Todos', value: 'todos', icon: 'event' },
  ];

  constructor(
    private router: Router,
    private menuService: MenuService
  ) { }

  goToPage(value: string,) {
    this.menuService.setCurrentIndex(2);
    this.router.navigate([`/dashboard/lists`], { queryParams: { tab: value } });
  }
}
