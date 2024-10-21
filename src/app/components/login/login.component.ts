import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../_services/auth.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
    private apiUrl = 'http://localhost:8080';

    form: any = {
        username: null,
        password: null,
    };
    isLoggedIn = false;
    isLoginFailed = false;
    errorMessage = '';

    constructor(private authService: AuthService, private router: Router) {}

    onSubmit(): void {
        const { username, password } = this.form;

        this.authService.login(username, password).subscribe({
            next: (data) => {
                window.sessionStorage.setItem('token', data.accessToken);
                window.sessionStorage.setItem('userId', data.userId);
                this.isLoginFailed = false;
                this.isLoggedIn = true;
            },
            error: (err) => {
                this.errorMessage = err.error.message;
                this.isLoginFailed = true;
            },
        });
    }

    redirect() {
        this.router.navigate(['home']);
    }

    loginWithOAuth2() {
        window.location.href = `${this.apiUrl}/oauth2/authorization/google`;
    }

    handleRedirect() {
        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get('token');
        const userId = urlParams.get('userId');

        if (token && userId) {
            sessionStorage.setItem('token', token);
            sessionStorage.setItem('userId', userId);
            this.router.navigate(['home']);
        }
    }

    redirectForgotPassword() {
        this.router.navigate(['forgot-password']);
    }

    ngOnInit() {
        this.handleRedirect();
    }
}
