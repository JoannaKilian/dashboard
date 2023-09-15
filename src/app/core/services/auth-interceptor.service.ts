import { Injectable } from '@angular/core'
import { HttpEvent, HttpHandler, HttpInterceptor, HttpParams, HttpRequest } from '@angular/common/http'
import { Observable, exhaustMap, filter, of, take } from 'rxjs'
import { UserService } from './user.service'
import { environment } from 'src/environments/environment';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
    constructor(private userService: UserService) { }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return this.userService.user
            .pipe(
                filter(user => user !== null),
                take(1),
                exhaustMap(user => {
                    if (!user) {
                        return next.handle(req)
                    } else if (user?.token) {
                        const urlWithUid = `${environment.firebaseConfig.databaseURL}/users/${user.uid}` + req.url;

                        const modifiedReq = req.clone({
                            url: urlWithUid,
                            params: new HttpParams().set('auth', user?.token)
                        })
                        return next.handle(modifiedReq)
                    } else return new Observable<HttpEvent<any>>()
                })
            )
    }
}

