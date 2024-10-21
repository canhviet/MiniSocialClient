import { Injectable } from '@angular/core';
import {
    HttpEvent,
    HttpInterceptor,
    HttpHandler,
    HttpRequest,
    HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {
    intercept(
        req: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        const token = sessionStorage.getItem('token');

        if (token) {
            req = req.clone({
                withCredentials: true,
                setHeaders: {
                    Authorization: `Bearer ${token}`,
                },
            });
        } else {
            req = req.clone({
                withCredentials: true,
            });
        }
        return next.handle(req);
    }

    isTokenExpired(token: string | null): boolean {
        if (!token) {
            return true;
        }

        const expiry = JSON.parse(atob(token.split('.')[1])).exp;
        return expiry * 1000 < Date.now();
    }
}

export const httpInterceptorProviders = [
    {
        provide: HTTP_INTERCEPTORS,
        useClass: HttpRequestInterceptor,
        multi: true,
    },
];
