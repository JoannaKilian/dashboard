import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  email: string = '';
 @Output() isForgotPasswordOpenEvent: EventEmitter<boolean> = new EventEmitter<boolean>()

  subscription: Subscription;

  constructor(
    private auth: AuthService
  ) { }

  forgotPassword() {
    console.log(this.email);
    this.auth.forgotPassword(this.email);
    this.email = '';
  }

  ngOnInit(): void {
    this.subscription = this.auth.toLogin$.subscribe((data) => {
      this.isForgotPasswordOpenEvent.emit(!data)
    })
  }
}
