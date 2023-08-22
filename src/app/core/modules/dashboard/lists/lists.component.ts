import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.scss'],
})
export class ListsComponent implements OnInit, OnDestroy {

  selectedTab: string;
  subscription: Subscription = new Subscription();

  constructor(
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.subscription.add(this.route.queryParams.subscribe(params => {
      this.selectedTab = params['tab'];
    }))
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

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}

