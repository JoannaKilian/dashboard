import { Component } from '@angular/core';

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.scss']
})
export class BaseComponent {

  showMenu:boolean = true;

  switchMenuHandler(){
    this.showMenu = !this.showMenu
  }


}
