import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { StateObservable } from '@ngrx/store';
import { AuthService } from 'src/app/core/services/auth.service';
import { UserService } from 'src/app/core/services/user.service';
import { InfoDialogComponent } from '../../components/info-dialog/info-dialog/info-dialog.component';

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
    private userService: UserService,
    public dialog: MatDialog
  ) {
  }


  ngOnInit() {
    this.displayName$ = this.userService.displayName$;
  }

  onOpenMenu() {
    this.openMenu = !this.openMenu
    this.openEvent.emit(this.openMenu)
  }

  logout() {
    const dialogRef = this.dialog.open(InfoDialogComponent, {
      data: {
        title: 'Confirm Leaving Dashboard',
        description: 'Are you sure you want to leave your dashboard?',
        type: 'submit'
      }
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'submit') {
        this.auth.signout();
      }
    });
  }
}
