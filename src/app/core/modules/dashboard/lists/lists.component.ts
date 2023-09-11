import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Section } from 'src/app/core/models/sections.models';
import { MenuService } from 'src/app/core/services/menu.service';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.scss'],
})
export class ListsComponent implements OnInit, OnDestroy {

  selectedTab: string;
  sections$: Observable<Section[]>;
  subscription: Subscription = new Subscription();

  constructor(
    private menuService: MenuService,
    private router: Router
  ) { }

  ngOnInit() {
    this.menuService.setCurrentIndex(1);
    this.menuService.getSections();
    this.sections$ = this.menuService.sections$;
  }

  getTabIndex(selectedTab: string): number {
    switch (selectedTab) {
      case 'persons':
        return 0;
      case 'cars':
        return 1;
      case 'pets':
        return 2;
      default:
        return 0;
    }
  }

  goToPage(name: string){
    this.router.navigate([`/dashboard/lists/${name}`]);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}

