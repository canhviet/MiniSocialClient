import { Component, Input } from '@angular/core';
import { ApiService } from '../../_services/api.service';
import { Router } from '@angular/router';
import { HttpHeaders } from '@angular/common/http';
import { AuthService } from '../../_services/auth.service';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Component({
    selector: 'app-forgot-password',
    templateUrl: './forgot-password.component.html',
    styleUrl: './forgot-password.component.css',
})
export class ForgotPasswordComponent {
    constructor(private authService: AuthService, private router: Router) {}

    @Input() email: String = '';

    onSubmit() {
        this.authService.forgotPassword(this.email).subscribe({
            next: () => {
                this.email = 'Please check your mail';
            },
        });
    }
}
