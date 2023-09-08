import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { MatDialog } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { BehaviorSubject, Subject, map } from "rxjs";
import { InfoDialogComponent } from "../shared/components/info-dialog/info-dialog/info-dialog.component";
import { GoogleAuthProvider } from "@angular/fire/auth"
import { UserService } from "./user.service";

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
        private userService: UserService,
        private router: Router,
        public dialog: MatDialog
    ) { }


    login(email: string, password: string) {
        this.fireAuth.signInWithEmailAndPassword(email, password).then((response) => {
            if (response && response.user) {
                console.log(response.user?.uid, typeof(response.user?.uid))
                this.userService.updateUser(response.user);
                localStorage.setItem('uid', response.user?.uid ? response.user?.uid.toString() : '');
                this.router.navigate(['/dashboard']);
            }
        }, err => {
            const dialogRef = this.dialog.open(InfoDialogComponent, {
                data: {
                    title: 'Error',
                    description: err.message,
                    type: 'error'
                }
            });
            dialogRef.afterClosed().subscribe(() => {
                this.goToLoginSubject.next(true);
            });
        })
    }

    register(email: string, password: string, displayName: string) {
        this.fireAuth.createUserWithEmailAndPassword(email, password).then((response) => {
            if (response.user) {
                response.user.updateProfile({
                    displayName: displayName
                }).then(() => {
                    const dialogRef = this.dialog.open(InfoDialogComponent, {
                        data: {
                            title: `${response.user?.displayName}, your registration was successful!`,
                            description: 'Let\'s log in',
                            type: 'info'
                        }
                    });
                    dialogRef.afterClosed().subscribe(() => {
                        this.goToLoginSubject.next(true);
                    });
                    this.goToLoginSubject.next(true);
                })
            }
        }, err => {
            const dialogRef = this.dialog.open(InfoDialogComponent, {
                data: {
                    title: 'Error',
                    description: err.message,
                    type: 'error'
                }
            });
            dialogRef.afterClosed().subscribe(() => {
                this.goToLoginSubject.next(false);
            });
        })
    }

    signout() {
        this.fireAuth.signOut().then(() => {
            const dialogRef = this.dialog.open(InfoDialogComponent, {
                data: {
                    title: 'Confirm Leaving Dashboard',
                    description: 'Are you sure you want to leave your dashboard?',
                    type: 'submit'
                }
            });
            dialogRef.afterClosed().subscribe((result) => {
                if (result === 'submit') {
                    localStorage.removeItem('uid');
                    this.router.navigate(['/login']);
                    this.goToLoginSubject.next(true);
                }
            });
        }, err => {
            const dialogRef = this.dialog.open(InfoDialogComponent, {
                data: {
                    title: 'Error',
                    description: err.message,
                    type: 'error'
                }
            });
            dialogRef.afterClosed().subscribe(() => {
                this.goToLoginSubject.next(true);
            });
        })
    }

    forgotPassword(email: string) {
        this.fireAuth.sendPasswordResetEmail(email).then(() => {
            const dialogRef = this.dialog.open(InfoDialogComponent, {
                data: {
                    title: 'Check your mailbox',
                    type: 'info'
                }
            });
            dialogRef.afterClosed().subscribe(() => {
                this.goToLoginSubject.next(true);
            });
        }, err => {
            const dialogRef = this.dialog.open(InfoDialogComponent, {
                data: {
                    title: 'Error',
                    description: err.message,
                    type: 'error'
                }
            });
            dialogRef.afterClosed().subscribe(() => {
                this.goToLoginSubject.next(true);
            });
        })
    }

    googleSignin() {
        return this.fireAuth.signInWithPopup(new GoogleAuthProvider).then((response) => {
            if (response && response.user) {
                this.userService.updateUser(response.user);
                localStorage.setItem('uid', response.user?.uid ? response.user?.uid.toString() : '');
                this.router.navigate(['/dashboard']);
            }
        }, err => {
            const dialogRef = this.dialog.open(InfoDialogComponent, {
                data: {
                    title: 'Error',
                    description: err.message,
                    type: 'error'
                }
            });
            dialogRef.afterClosed().subscribe(() => {
                this.goToLoginSubject.next(true);
            });
        })
    }

}
