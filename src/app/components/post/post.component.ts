import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    EventEmitter,
    Input,
    Output,
} from '@angular/core';
import {
    CommentRequest,
    CommentResponse,
    DataResponse,
    Post,
    User,
} from '../../../types';
import { UserService } from '../../_services/user.service';
import { CommentService } from '../../_services/comment.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-post',
    templateUrl: './post.component.html',
    styleUrl: './post.component.css',
})
export class PostComponent {
    constructor(
        private userService: UserService,
        private commentService: CommentService,
        private router: Router
    ) {}

    postUser: User = {
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

    commnets: CommentResponse[] = [];

    @Input() comment: CommentRequest = {
        userId: 0,
        postId: 0,
        content: '',
    };

    getPostUser(userId: number) {
        this.userService
            .getById('http://localhost:8080/user/' + userId)
            .subscribe({
                next: (res: DataResponse) => {
                    this.postUser = res.data;
                },
                error: (error) => {
                    console.log(error);
                },
            });
    }

    getPostComments(postId: number) {
        this.commentService
            .getComments('http://localhost:8080/comment/list/' + postId)
            .subscribe({
                next: (res: DataResponse) => {
                    this.commnets = res.data;
                },
            });
    }

    @Input() post!: Post;

    ngOnInit() {
        this.getPostUser(this.post.userId);
    }

    visible: boolean = false;

    showDialog() {
        this.visible = true;
        this.getPostComments(this.post.id);
    }

    addComment() {
        let data = {
            postId: this.post.id,
            content: this.comment.content,
            userId: Number(sessionStorage.getItem('userId')),
        };
        this.commentService
            .addComment('http://localhost:8080/comment/', data)
            .subscribe({
                next: (res) => {
                    this.showDialog();
                    this.comment.content = '';
                },
            });
    }

    redirectProfile(userId: number) {
        this.router.navigate(['profile', userId]);
    }

    likePost(postId: number) {
        let data = {
            postId: postId,
            userId: Number(sessionStorage.getItem('userId')),
        };

        this.commentService
            .addComment('http://localhost:8080/post/like', data)
            .subscribe(() => {
                this.post.userHasLike = true;
            });
    }

    unLikePost(postId: number) {
        let data = {
            postId: postId,
            userId: Number(sessionStorage.getItem('userId')),
        };

        this.commentService
            .addComment('http://localhost:8080/post/unlike', data)
            .subscribe(() => {
                this.post.userHasLike = false;
            });
    }
}
