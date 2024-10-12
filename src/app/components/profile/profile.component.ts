import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../_services/user.service';
import { DataResponse, Post, User } from '../../../types';
import { PostService } from '../../_services/post.service';
import { StompService } from '../../_services/stomp.service';

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
        following: false,
    };

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private userService: UserService,
        private postService: PostService
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
    }

    followUser() {
        let data = {
            userId: this.myUserId,
            followingId: this.selectedUserId,
        };
        this.userService
            .addUser('http://localhost:8080/user/follow', data)
            .subscribe(() => {
                this.selectedUser.following = true;
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
                this.selectedUser.following = false;
            });
    }

    redirectToChat(receiverId: number) {
        this.router.navigate(['chat', receiverId]);
    }
}
