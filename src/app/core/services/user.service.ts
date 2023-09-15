import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { AngularFireDatabase } from "@angular/fire/compat/database";
import { BehaviorSubject, Observable, map } from "rxjs";
import { User } from "../models/user.model";

@Injectable({
    providedIn: 'root'
})

export class UserService {

    user = new BehaviorSubject<User | null>(null);
    
    token$: Observable<string | null>;

    constructor(
        private fireAuth: AngularFireAuth,
        private db: AngularFireDatabase
    ) {
        this.fireAuth.authState.subscribe((user) => {
            if (user) {
                user.getIdToken(true).then(idToken => {
                    const userData = new User(user.uid, user.email, user.displayName, idToken)
                    this.user.next(userData);
                });
            } else {
                this.user.next(null);
            }
        }
        );
    }

    authState$: Observable<firebase.default.User | null> = this.fireAuth.authState;
    displayName$: Observable<string | null> = this.authState$.pipe(
        map(user => {
            return !user ? null : user.displayName
        })
    );

    getToken(): Observable<string | null> {
        return this.fireAuth.idToken;
    }


    updateUser(user: firebase.default.User): void {
        if (user.displayName && user.email) {
            this.db.object<User>('/users/' + user.uid)
                .update({
                    uid: user.uid,
                    name: user.displayName,
                    email: user.email,
                })
        }
    }
}