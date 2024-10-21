import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Post, User } from '../../../types';
import { AddPostComponent } from '../add-post/add-post.component';

@Component({
    selector: 'app-edit-profile',
    templateUrl: './edit-profile.component.html',
    styleUrl: './edit-profile.component.css',
})
export class EditProfileComponent {
    constructor(
        public dialogRef: MatDialogRef<EditProfileComponent>,
        @Inject(MAT_DIALOG_DATA) public user: User
    ) {}

    closeDialog(): void {
        this.dialogRef.close();
    }

    onSubmit() {}
}
