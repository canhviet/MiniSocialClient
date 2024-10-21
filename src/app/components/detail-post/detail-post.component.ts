import { Component, Inject, Input } from '@angular/core';
import { Post } from '../../../types';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AddPostComponent } from '../add-post/add-post.component';

@Component({
    selector: 'app-detail-post',
    templateUrl: './detail-post.component.html',
    styleUrl: './detail-post.component.css',
})
export class DetailPostComponent {
    constructor(
        public dialogRef: MatDialogRef<DetailPostComponent>,
        @Inject(MAT_DIALOG_DATA) public post: Post
    ) {}

    closeDialog(): void {
        this.dialogRef.close();
    }

    myProfile: boolean = false;

    ngOnInit() {
        if (this.post.userId == Number(sessionStorage.getItem('userId'))) {
            this.myProfile = true;
        }
    }
}
