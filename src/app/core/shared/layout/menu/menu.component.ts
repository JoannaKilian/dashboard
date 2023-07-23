import {Component, OnInit} from '@angular/core';
import {Menu} from "../../../models/menu.models";
import {MENU} from "../../../config/menu";
import {ActivatedRoute, Router} from "@angular/router";
import { MenuService } from 'src/app/core/services/menu.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  menu: Menu[] = MENU;
  currentPage: number;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private menuService: MenuService
  ) { }


  ngOnInit() {
    this.menuService.getCurrentIndex().subscribe(index => {
      this.currentPage = index;
    });
  }

  changePage(page: number, path: string) {
    this.menuService.setCurrentIndex(page);
    this.router.navigate([`../dashboard/${path}`], { relativeTo: this.route });
  }

}
