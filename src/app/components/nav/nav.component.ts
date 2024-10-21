import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AddPostComponent } from '../add-post/add-post.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
    selector: 'app-nav',
    templateUrl: './nav.component.html',
    styleUrl: './nav.component.css',
})
export class NavComponent {
    constructor(public dialog: MatDialog, private router: Router) {}

    redirectMessage() {
        this.router.navigate(['chat']);
    }

    redirectHome() {
        this.router.navigate(['home']);
    }

    redirectMyProfile(userId: number) {
        userId = Number(sessionStorage.getItem('userId'));
        this.router.navigate(['profile', userId]);
    }

    openAddPost(): void {
        const dialogRef = this.dialog.open(AddPostComponent, {
            width: '250px',
        });
    }
}
