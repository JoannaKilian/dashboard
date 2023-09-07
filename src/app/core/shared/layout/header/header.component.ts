import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { StateObservable } from '@ngrx/store';
import { AuthService } from 'src/app/core/services/auth.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Output() openEvent = new EventEmitter<boolean>;
  openMenu: boolean;
  displayName$: StateObservable

  constructor(
    private auth: AuthService,
    private userService: UserService
  ) {
  }


  ngOnInit() {
    this.displayName$ = this.userService.displayName$;
console.log(this.userService);
    this.userService.authState$.subscribe(data=> {
      console.log(data)
    })
  }

  onOpenMenu() {
    this.openMenu = !this.openMenu
    this.openEvent.emit(this.openMenu)
  }

  logout() {
    this.auth.signout();
  }


}
