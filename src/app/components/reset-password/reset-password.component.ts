import { Component, Input } from '@angular/core';
import { AuthService } from '../../_services/auth.service';
import { Router } from '@angular/router';
import { ResetPassword } from '../../../types';

@Component({
    selector: 'app-reset-password',
    templateUrl: './reset-password.component.html',
    styleUrl: './reset-password.component.css',
})
export class ResetPasswordComponent {
    constructor(private authService: AuthService, private router: Router) {}

    @Input() data: ResetPassword = {
        password: '',
        confirmPassword: '',
        secretKey: '',
    };

    notify: boolean = false;

    ngOnInit() {
        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get('token');

        if (token) {
            this.authService.resetPassword(token).subscribe({
                next: (res) => {
                    this.data.secretKey = token;
                },
            });
        }
    }

    onSubmit() {
        this.authService.changePassword(this.data).subscribe({
            next: () => {
                this.data.password = '';
                this.data.confirmPassword = '';

                this.router.navigate(['']);
            },
        });
    }
}
