import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit, OnDestroy {
  email: string = '';
  @Output() isForgotPasswordOpenEvent: EventEmitter<boolean> = new EventEmitter<boolean>()
  goToLogin: boolean;

  subscription: Subscription;

  constructor(
    private auth: AuthService
  ) { }

  forgotPassword() {
    console.log('forgotHandler')
    if(this.email !== ''){
      this.auth.forgotPassword(this.email);
      this.email = '';
      this.isForgotPasswordOpenEvent.emit(!this.goToLogin)
    }
    console.log(this.email);
  }

  ngOnInit(): void {
    this.subscription = this.auth.toLogin$.subscribe((data) => {
      this.goToLogin = data
    })
  }


  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
