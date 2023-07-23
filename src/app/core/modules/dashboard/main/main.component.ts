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
    { title: 'Persons', value: 'persons' },
    { title: 'Cars', value: 'cars' },
    { title: 'Pets', value: 'pets' },
    { title: 'Events', value: 'events' },
    { title: 'Food', value: 'food' },
    { title: 'Todos', value: 'todos' },
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
