import {Component, OnInit} from '@angular/core';
import {Menu} from "../../../models/menu.models";
import {MENU} from "../../../config/menu";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  menu: Menu[] = MENU;

  currentPage: number = 1

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) { }


  ngOnInit() {
  }

  changePage(page: number, path: string) {
    console.log(this.route);
    console.log(`/${path}`);
    this.currentPage = page;
    this.router.navigate([`../dashboard/${path}`], { relativeTo: this.route });
  }

}
