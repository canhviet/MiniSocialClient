import { Component, Inject, Input } from '@angular/core';
import { StorageService } from '../../_services/storage.service';
import { Router } from '@angular/router';
import { Post } from '../../../types';
import { PostService } from '../../_services/post.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
@Component({
    selector: 'app-add-post',
    templateUrl: './add-post.component.html',
    styleUrl: './add-post.component.css',
})
export class AddPostComponent {
    selectedFile: File | null = null;

    @Input() selectedPost: Post = {
        userId: 0,
        image: '',
        title: '',
        id: 0,
        userHasLike: false,
    };

    constructor(
        private storageService: StorageService,
        private router: Router,
        private postService: PostService,
        public dialogRef: MatDialogRef<AddPostComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {}

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
                    let data = {
                        title: this.selectedPost.title,
                        image: url,
                        userId: this.selectedPost.userId,
                    };
                    this.postService
                        .addPost('http://localhost:8080/post/', data)
                        .subscribe(() => {
                            this.router.navigate(['home']).then(() => {
                                window.location.reload();
                            });
                        });
                });
        }
    }

    ngOnInit() {
        this.selectedPost.userId = Number(sessionStorage.getItem('userId'));
    }

    onClose(): void {
        this.dialogRef.close();
    }
}
