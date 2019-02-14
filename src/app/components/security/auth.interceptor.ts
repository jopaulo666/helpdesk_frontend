import { Injectable } from '@angular/core';
import { SharedService } from 'src/app/services/shared.service';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from "@angular/common/http";
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    shared: SharedService;

    constructor() {
        this.shared = SharedService.getInstance();
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        //console de error
        console.log('Chegou no interceptor -->');
        let authRequest: any;
        //console de error
        console.log('No interceptor verifica logado -->', this.shared.isLoggedIn);
        if (this.shared.isLoggedIn) {
            //console de error
            console.log('Caiu no IF do interceptor -->');
            authRequest = req.clone({
                setHeaders: {
                    'Authorization': this.shared.token
                }
            });
            return next.handle(authRequest);
        } else {
            //console de error
            console.log('Caiu no else do interceptor -->');
            return next.handle(req);
        }
    }
}
