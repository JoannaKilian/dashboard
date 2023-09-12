import {Component, OnDestroy, OnInit} from '@angular/core';
import {Menu} from "../../../models/menu.models";
import {MENU} from "../../../config/menu";
import {ActivatedRoute, Router} from "@angular/router";
import { MenuService } from 'src/app/core/services/menu.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-vartical-menu',
  templateUrl: './vartical-menu.component.html',
  styleUrls: ['./vartical-menu.component.scss']
})
export class VarticalMenuComponent implements OnInit, OnDestroy {

  menu: Menu[] = MENU;
  currentPage: number;
  subscription: Subscription = new Subscription();

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private menuService: MenuService
  ) { }


  ngOnInit() {
    this.subscription.add(this.menuService.getCurrentIndex().subscribe(index => {
      console.log(index)
      this.currentPage = index;
    }));
  }

  changePage(page: number, path: string) {
    this.menuService.setCurrentIndex(page);
    this.router.navigate([`../dashboard/${path}`], { relativeTo: this.route });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
