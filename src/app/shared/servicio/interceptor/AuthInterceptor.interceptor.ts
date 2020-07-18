import { HttpInterceptor, HttpClient, HttpRequest, HttpHandler, HttpEvent, HttpResponse, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { map, catchError } from "rxjs/operators";

import { SessionService } from "../session.service";
import { AuthService } from "src/app/publico/shared/servicio/auth.service";
import { Router } from "@angular/router";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(
        public http: HttpClient,
        private sessionService: SessionService,
        private authService: AuthService,
        private router: Router) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const accessToken = this.sessionService.getCurrentToken();
        const refreshToken = this.sessionService.getRefreshToken();
        const session = this.sessionService.getCurrentSession();

        if (accessToken && !req.url.includes("token")) {

            req = req.clone({
                setHeaders: {
                    'Authorization': `Bearer ${accessToken}`
                }
            });
        }

        return next.handle(req).pipe(
            map((event: HttpEvent<any>) => {
                if (event instanceof HttpResponse) {
                    // this.errorDialogService.openDialog(event);
                }
                return event;
            }),
            catchError((error: HttpErrorResponse) => {
                console.log('error codigo: ', error.status);
                if (error.status === 401 && this.router.url !== '/login') {
                    // REVISAR URL POST REFRES TOKEN, MIENTRAS SE MANDA A LOGIN
                    this.authService.logout();

                    //Generate params for token refreshing
                    let params = {
                        token: accessToken,
                        refreshToken: refreshToken
                    };

                    /*
                    // refrescamos token
                    this.authService.refresToken(params)
                        .subscribe(result => {
                            //Update tokens
                            session.token = session.access_token;
                            session.Authorization = 'Bearer ' + session.access_token;
                            sessionStorage.setItem("session", JSON.stringify(session));
                            this.sessionService.setCurrentSession(session);

                            //Clone our fieled request ant try to resend it
                            req = req.clone({
                                setHeaders: {
                                    'Authorization': `Bearer ${session.token}`
                                }
                            });
                            //return next.handle(req).pipe( catchError( error => { console.log(error); } ) );
                        },
                        error => {
                        });
                        */

                }

                return throwError(error);
            })
        );

    }

}