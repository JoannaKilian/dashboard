import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Output() openEvent = new EventEmitter<boolean>;
  openMenu: boolean;

  constructor() {
  }


  ngOnInit() {
  }

  onOpenMenu() {
    this.openMenu = !this.openMenu
    this.openEvent.emit(this.openMenu)
  }


}
