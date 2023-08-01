import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { Router } from "@angular/router";
import { BehaviorSubject } from "rxjs";

@Injectable({
    providedIn: 'root'
})

export class AuthService {

    private goToLoginSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
    public toLogin$ = this.goToLoginSubject.asObservable();

    goToLogin: boolean;

    constructor(
        private fireAuth: AngularFireAuth,
        private router: Router) { }


    login(email: string, password: string) {
        this.fireAuth.signInWithEmailAndPassword(email, password).then(() => {
            localStorage.setItem('token', 'true');
            this.router.navigate(['/dashboard']);
        }, err => {
            alert(err.message);
            this.router.navigate(['/login']);
            this.goToLoginSubject.next(true);
        })
    }

    register(email: string, password: string) {
        this.fireAuth.createUserWithEmailAndPassword(email, password).then(() => {
            alert('Registration Successful')
            this.router.navigate(['/login']);
            this.goToLoginSubject.next(true);
        }, err => {
            alert(err.message);
            this.goToLoginSubject.next(false);
        })
    }

    signout() {
        this.fireAuth.signOut().then(() => {
            localStorage.removeItem('token');
            this.router.navigate(['/login']);
            this.goToLoginSubject.next(true);
        }, err => {
            alert(err.message);
            this.goToLoginSubject.next(true);
        })
    }

}
