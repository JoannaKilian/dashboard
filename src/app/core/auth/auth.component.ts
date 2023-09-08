import { Component, OnInit, OnDestroy } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "../services/auth.service";
import { Subscription } from "rxjs";

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html',
    styleUrls: ['./auth.component.scss']
})

export class AuthComponent implements OnInit, OnDestroy {

    authForm: FormGroup;
    login: boolean = true;
    repeatPasswordError: boolean = false;
    hidePassword: boolean = true;
    hideRepeatPassword: boolean = true;

    forgotPassword: boolean = false;
    email: string = '';


    subscription: Subscription;

    constructor(
        private formBuilder: FormBuilder,
        private auth: AuthService
    ) { }

    ngOnInit(): void {
        this.registerForm();
        this.authForm.get('repeatPassword')?.valueChanges.subscribe(() => {
            this.checkRepeatPassword();
        });
        this.subscription = this.auth.toLogin$.subscribe(data => {
            this.login = data;
            if (this.login) {
                this.authForm.get('repeatPassword')?.clearValidators();
                this.authForm.get('name')?.clearValidators();
            } else {
                this.authForm.get('repeatPassword')?.addValidators([Validators.required]);
                this.authForm.get('name')?.addValidators([Validators.required])
            }
            this.authForm.patchValue({ password: '', repeatPassword: '', name: '' });
            this.authForm.get('repeatPassword')?.markAsUntouched();
            this.authForm.get('password')?.markAsUntouched();
            this.authForm.get('name')?.markAsUntouched();
        })
    }

    registerForm() {
        this.authForm = this.formBuilder.group({
            username: new FormControl('', [Validators.required, Validators.minLength(4), Validators.email]),
            name: new FormControl('', [Validators.required]),
            password: new FormControl('', [Validators.required, Validators.minLength(6)]),
            repeatPassword: new FormControl('', Validators.minLength(6))
        })
    }

    checkRepeatPassword() {
        this.repeatPasswordError = this.authForm.get('password')?.value !== this.authForm.get('repeatPassword')?.value;
    }

    onSubmit() {
        if (this.authForm.invalid) {
            return;
        }

        const username = this.authForm.get('username')?.value;
        const name = this.authForm.get('name')?.value;
        const password = this.authForm.get('password')?.value;

        if (this.login) {
            this.auth.login(username, password);
        } else {
            this.auth.register(username, password, name);
        }
    }


    onSwitchLogin() {
        this.forgotPassword = false;
        this.login = !this.login;
        if (this.login) {
            this.authForm.get('repeatPassword')?.clearValidators();
            this.authForm.get('name')?.clearValidators();
        } else {
            this.authForm.get('repeatPassword')?.addValidators([Validators.required]);
            this.authForm.get('name')?.addValidators([Validators.required])
        }
        this.repeatPasswordError = false;
        this.authForm.patchValue({ password: '', repeatPassword: '', name: '' });
        this.authForm.get('repeatPassword')?.markAsUntouched();
        this.authForm.get('name')?.markAsUntouched();
        this.authForm.get('password')?.markAsUntouched();
    }

    forgotHandler(isForgotPasswordOpen: boolean) {
        this.forgotPassword = isForgotPasswordOpen;
    }

    signinWithGoogle(){
        this.auth.googleSignin();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
