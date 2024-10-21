import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../_services/user.service';
import { DataResponse, Post, User } from '../../../types';
import { PostService } from '../../_services/post.service';
import { StompService } from '../../_services/stomp.service';
import { MatDialog } from '@angular/material/dialog';
import { DetailPostComponent } from '../detail-post/detail-post.component';
import { EditProfileComponent } from '../edit-profile/edit-profile.component';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrl: './profile.component.css',
})
export class ProfileComponent {
    selectedUserId: number = -1;

    myUserId = Number(sessionStorage.getItem('userId'));

    myProfile: boolean = false;

    posts: Post[] = [];

    isFollow: boolean = false;

    selectedUser: User = {
        id: 0,
        phone: '',
        name: '',
        dateOfBirth: '',
        email: '',
        gender: '',
        username: '',
        userStatus: '',
        avatar: '',
    };

    selectedPost: Post = {
        id: 0,
        userId: 0,
        image: '',
        title: '',
    };

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private userService: UserService,
        private postService: PostService,
        public dialog: MatDialog,
        private stomp: StompService
    ) {}

    ngOnInit() {
        this.route.params.subscribe((params) => {
            this.selectedUserId = +params['userId'];
            if (this.selectedUserId == this.myUserId) {
                this.myProfile = true;
            }

            this.userService
                .getById('http://localhost:8080/user/' + this.selectedUserId)
                .subscribe({
                    next: (res: DataResponse) => {
                        this.selectedUser = res.data;

                        this.userService
                            .getById(
                                'http://localhost:8080/user/check/' +
                                    this.myUserId +
                                    '/' +
                                    this.selectedUserId
                            )
                            .subscribe({
                                next: (res: DataResponse) => {
                                    if (res.data) {
                                        this.isFollow = true;
                                    } else {
                                        this.isFollow = false;
                                    }
                                },
                            });
                    },
                });
        });
        this.postService
            .getPosts('http://localhost:8080/post/list/' + this.selectedUserId)
            .subscribe({
                next: (res: DataResponse) => {
                    this.posts = res.data;
                },
            });

        if (!this.stomp.stompClient.connected) {
            this.stomp.stompClient.connect({}, () => {
                console.log('Connected to WebSocket');
            });
        }
    }

    followUser() {
        let data = {
            userId: this.myUserId,
            followingId: this.selectedUserId,
        };
        this.userService
            .addUser('http://localhost:8080/user/follow', data)
            .subscribe(() => {
                this.isFollow = true;
            });
    }

    unFollowUser() {
        let data = {
            userId: this.myUserId,
            followingId: this.selectedUserId,
        };
        this.userService
            .addUser('http://localhost:8080/user/unfollow', data)
            .subscribe(() => {
                this.isFollow = false;
            });
    }

    redirectToChat(receiverId: number) {
        this.router.navigate(['chat', receiverId]);
    }

    viewDetailPost(index: number) {
        this.selectedPost = this.posts[index];
        const dialogRef = this.dialog.open(DetailPostComponent, {
            width: '90%',
            height: '80vh',
            data: this.selectedPost,
        });
    }

    editProfile() {
        const dialogRef = this.dialog.open(EditProfileComponent, {
            width: '90%',
            data: this.selectedUser,
        });
    }
}
