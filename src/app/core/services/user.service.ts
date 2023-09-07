import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { Observable, map } from "rxjs";

@Injectable({
    providedIn: 'root'
})

export class UserService {

    constructor(
        private fireAuth: AngularFireAuth,
    ) { }

    authState$: Observable<firebase.default.User | null> = this.fireAuth.authState;
    displayName$: Observable<string | null> = this.authState$.pipe(
        map(user => {
            return !user ? null : user.displayName
        })
    );
}