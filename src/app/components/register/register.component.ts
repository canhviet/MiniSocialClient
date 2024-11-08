import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RegisterRequest } from '../../../types';
import { UserService } from '../../_services/user.service';
import { AuthService } from '../../_services/auth.service';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrl: './register.component.css',
})
export class RegisterComponent {
    constructor(
        public dialogRef: MatDialogRef<RegisterComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private userService: UserService,
        private authService: AuthService
    ) {}

    user: RegisterRequest = {
        password: '',
        confirmPassword: '',
        email: '',
        username: '',
    };

    closeDialog(): void {
        this.dialogRef.close();
    }

    onSubmit() {
        this.user.confirmPassword;
        this.userService
            .register('http://localhost:8080/auth/register', this.user)
            .subscribe({
                next: (res) => {
                    this.authService.login(
                        this.user.username,
                        this.user.password
                    );
                },
            });
    }
}
