import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

const AUTH_API = 'http://localhost:8080/auth/';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    constructor(private apiService: ApiService) {}

    login(username: string, password: string): Observable<any> {
        return this.apiService.post(
            AUTH_API + 'access-token',
            {
                username,
                password,
            },
            httpOptions
        );
    }

    refresh(refresh_token: string): Observable<any> {
        return this.apiService.post(AUTH_API + 'refresh-token', {}, {});
    }

    handleRedirect(): Observable<any> {
        return this.apiService.post(
            `http://localhost:8080/oauth2/handle-redirect`,
            {},
            httpOptions
        );
    }

    register(
        username: string,
        email: string,
        password: string
    ): Observable<any> {
        return this.apiService.post(
            AUTH_API + 'register',
            {
                username,
                email,
                password,
            },
            httpOptions
        );
    }

    logout(): Observable<any> {
        return this.apiService.post(AUTH_API + 'remove-token', {}, httpOptions);
    }
}
