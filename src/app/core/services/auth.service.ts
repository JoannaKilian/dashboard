import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { MatDialog } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { BehaviorSubject, Subject } from "rxjs";
import { InfoDialogComponent } from "../shared/components/info-dialog/info-dialog/info-dialog.component";

@Injectable({
    providedIn: 'root'
})

export class AuthService {

    private goToLoginSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
    public toLogin$ = this.goToLoginSubject.asObservable();

    private errorSubject: Subject<string> = new Subject<string>();
    public error$ = this.errorSubject.asObservable();

    goToLogin: boolean;

    constructor(
        private fireAuth: AngularFireAuth,
        private router: Router,
        public dialog: MatDialog) { }


    login(email: string, password: string) {
        this.fireAuth.signInWithEmailAndPassword(email, password).then(() => {
            localStorage.setItem('token', 'true');
            this.router.navigate(['/dashboard']);
        }, err => {
            const dialogRef = this.dialog.open(InfoDialogComponent, {data: {
                title: 'Error',
                description: err.message,
                type: 'error'
            }});

            dialogRef.afterClosed().subscribe(result => {
                console.log(`Dialog result: ${result}`);
                this.goToLoginSubject.next(true);
            });
        })
    }

    register(email: string, password: string) {
        this.fireAuth.createUserWithEmailAndPassword(email, password).then(() => {
            alert('Registration Successful')
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

    forgotPassword(email: string) {
        this.fireAuth.sendPasswordResetEmail(email).then(() => {
            this.goToLoginSubject.next(false);
        }, err => {
            alert(err.message)
        })
    }

}
