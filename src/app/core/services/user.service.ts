import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { AngularFireDatabase } from "@angular/fire/compat/database";
import { Observable, map } from "rxjs";
import { User } from "../models/user.model";

@Injectable({
    providedIn: 'root'
})

export class UserService {

    constructor(
        private fireAuth: AngularFireAuth,
        private db: AngularFireDatabase
    ) { }

    authState$: Observable<firebase.default.User | null> = this.fireAuth.authState;
    displayName$: Observable<string | null> = this.authState$.pipe(
        map(user => {
            return !user ? null : user.displayName
        })
    );

    getUid(): string | null {
        return localStorage.getItem('uid');
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