import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Post, User } from '../../../types';
import { formatDate } from '@angular/common';
import { UserService } from '../../_services/user.service';
import { StorageService } from '../../_services/storage.service';

@Component({
    selector: 'app-edit-profile',
    templateUrl: './edit-profile.component.html',
    styleUrl: './edit-profile.component.css',
})
export class EditProfileComponent {
    constructor(
        private storageService: StorageService,
        public dialogRef: MatDialogRef<EditProfileComponent>,
        @Inject(MAT_DIALOG_DATA) public user: User,
        private userService: UserService
    ) {}

    selectedFile: File | null = null;

    ngOnInit() {
        this.user.dateOfBirth = new Date(this.user.dateOfBirth)
            .toISOString()
            .split('T')[0];
    }

    closeDialog(): void {
        this.dialogRef.close();
    }

    onFileSelected(event: any) {
        const file: File = event.target.files[0];
        if (file) {
            this.selectedFile = file;
        }
    }

    onSubmit() {
        if (this.selectedFile) {
            this.storageService
                .uploadFile(this.selectedFile)
                .subscribe((url) => {
                    this.user.avatar = url;
                    this.userService
                        .updateUser(
                            'http://localhost:8080/user/' +
                                sessionStorage.getItem('userId'),
                            this.user
                        )
                        .subscribe();
                });
        } else {
            this.userService
                .updateUser(
                    'http://localhost:8080/user/' +
                        sessionStorage.getItem('userId'),
                    this.user
                )
                .subscribe();
        }
    }
}
