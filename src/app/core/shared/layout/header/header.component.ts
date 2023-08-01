import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Output() openEvent = new EventEmitter<boolean>;
  openMenu: boolean;

  constructor(private auth: AuthService) {
  }


  ngOnInit() {
  }

  onOpenMenu() {
    this.openMenu = !this.openMenu
    this.openEvent.emit(this.openMenu)
  }

  logout(){
    this.auth.signout();
  }


}
