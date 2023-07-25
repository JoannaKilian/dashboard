import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";

@Component({
 selector: 'app-auth',
 templateUrl: './auth.component.html',
 styleUrls: ['./auth.component.scss']
})

export class AuthComponent implements OnInit {

    authForm: FormGroup;

    constructor(private formBuilder: FormBuilder) { }

    ngOnInit(): void {
        this.authForm = this.formBuilder.group({
            username: new FormControl ('', Validators.required),
            password: new FormControl ('', Validators.required)
        })
    }

    onSubmit() {
        if (this.authForm.invalid) {
            return;
          }
      
          const username = this.authForm.get('username')?.value;
          const password = this.authForm.get('password')?.value;
    }
}
