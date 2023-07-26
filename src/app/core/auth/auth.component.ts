import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html',
    styleUrls: ['./auth.component.scss']
})

export class AuthComponent implements OnInit {

    authForm: FormGroup;
    isLogin: boolean = true;
    repeatPasswordError: boolean = false;

    constructor(private formBuilder: FormBuilder) { }

    ngOnInit(): void {
        this.registerForm();
        this.authForm.get('repeatPassword')?.valueChanges.subscribe(() => {
            this.checkRepeatPassword();
        });
    }

    registerForm() {
        this.authForm = this.formBuilder.group({
            username: new FormControl('', [Validators.required, Validators.minLength(4)]),
            password: new FormControl('', [Validators.required, Validators.minLength(4)]),
            repeatPassword: new FormControl('', Validators.minLength(4))
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
        const password = this.authForm.get('password')?.value;

        this.authForm.reset();
    }

    onSwitchLogin() {
        this.isLogin = !this.isLogin;
        if (this.isLogin) {
            this.authForm.get('repeatPassword')?.clearValidators();
        } else {
            this.authForm.get('repeatPassword')?.addValidators([Validators.required])
        }
        this.repeatPasswordError = false;
        this.authForm.patchValue({ password: '', repeatPassword: '' });
        this.authForm.get('repeatPassword')?.markAsUntouched();
        this.authForm.get('password')?.markAsUntouched();
    }
}
