import { Component } from '@angular/core';
import {
    DataResponse,
    NotificationResponse,
    Post,
    User,
    WebSocketResponse,
} from '../../../types';
import { PostService } from '../../_services/post.service';
import { StompService } from '../../_services/stomp.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrl: './home.component.css',
})
export class HomeComponent {
    constructor(
        private postService: PostService,
        private stomp: StompService
    ) {}

    posts: Post[] = [];

    notification: NotificationResponse = {
        timestamp: '',
        content: '',
        id: 0,
        read: false,
        follow: false,
        message: false,
        otherUser: 0,
    };

    isDialogVisible = false;

    stompNotiSub: Subscription | undefined;

    fetchPosts() {
        this.postService
            .getPosts(
                'http://localhost:8080/post/list?userId=' +
                    sessionStorage.getItem('userId')
            )
            .subscribe({
                next: (res: DataResponse) => {
                    this.posts = res.data;
                },
                error: (error) => {
                    console.log(error);
                },
            });
    }

    ngOnInit() {
        this.fetchPosts();

        if (!this.stomp.stompClient.connected) {
            this.stomp.stompClient.connect({}, () => {
                console.log('Connected to WebSocket');
                this.subscribeToCurrentUserNotification();
            });
        } else {
            this.subscribeToCurrentUserNotification();
        }
    }

    subscribeToCurrentUserNotification() {
        this.stompNotiSub?.unsubscribe();
        this.stompNotiSub = this.stomp.subscribe(
            'notify/' + sessionStorage.getItem('userId'),
            (payload: any) => {
                let res: WebSocketResponse = payload;
                if (res.type == 'FOLLOW') {
                    this.showNoti();
                    this.notification = res.data;
                } else if (res.type == 'MSG') {
                    this.showNoti();
                    this.notification = res.data;
                }
            }
        );
    }

    showNoti() {
        this.isDialogVisible = true;

        setTimeout(() => {
            this.isDialogVisible = false;
        }, 5000);
    }
}
