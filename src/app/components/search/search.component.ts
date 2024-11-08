import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DataResponse, User } from '../../../types';
import { Router } from '@angular/router';
import { UserService } from '../../_services/user.service';

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrl: './search.component.css',
})
export class SearchComponent {
    constructor(
        public dialogRef: MatDialogRef<SearchComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private router: Router,
        private userService: UserService
    ) {}

    text: String = '';

    users: User[] = [];

    onClose(): void {
        this.dialogRef.close();
    }

    Navigate(userId: number) {
        this.router.navigate(['profile', userId]);
        this.onClose();
    }

    search(event: any) {
        if (event != null) {
            this.userService
                .getById(
                    'http://localhost:8080/user/search?s=' +
                        event +
                        '&userId=' +
                        sessionStorage.getItem('userId')
                )
                .subscribe({
                    next: (res: DataResponse) => {
                        this.users = res.data;
                    },
                });
        }
    }
}
