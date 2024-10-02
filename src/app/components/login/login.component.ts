import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../_services/auth.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
    form: any = {
        username: null,
        password: null,
    };
    isLoggedIn = false;
    isLoginFailed = false;
    errorMessage = '';

    constructor(private authService: AuthService, private router: Router) {}

    ngOnInit(): void {}

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
}
