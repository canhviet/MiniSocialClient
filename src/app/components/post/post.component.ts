import { Component, Input } from '@angular/core';
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

    userHasLike: boolean = false;

    isReply: boolean = false;

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
    };

    comments: CommentResponse[] = [];

    @Input() comment: CommentRequest = {
        userId: 0,
        postId: 0,
        content: '',
        parentId: 0,
    };

    selectedComment: CommentResponse = {
        id: 0,
        postId: 0,
        authorName: '',
        authorAvatarUrl: '',
        content: '',
        parentId: 0,
        children: [],
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
                    this.comments = this.buildCommentTree(res.data);
                },
            });
    }

    @Input() post!: Post;

    ngOnInit() {
        this.getPostUser(this.post.userId);

        this.userService
            .getById(
                'http://localhost:8080/post/check/' +
                    sessionStorage.getItem('userId') +
                    '/' +
                    this.post.id
            )
            .subscribe({
                next: (res: DataResponse) => {
                    this.userHasLike = res.data;
                },
            });
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
            parentId: this.selectedComment.id,
        };
        this.commentService
            .addComment('http://localhost:8080/comment/', data)
            .subscribe({
                next: () => {
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
                this.userHasLike = true;
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
                this.userHasLike = false;
            });
    }

    buildCommentTree(comments: CommentResponse[]): CommentResponse[] {
        const map = new Map<number, CommentResponse>();
        const roots: CommentResponse[] = [];

        comments.forEach((comment) => {
            comment.children = [];
            map.set(comment.id, comment);
        });

        comments.forEach((comment) => {
            if (comment.parentId == 0) {
                roots.push(comment);
            } else {
                const parent = map.get(comment.parentId);
                if (parent) {
                    parent.children.push(comment);
                }
            }
        });

        return roots;
    }

    replyToComment(comment: CommentResponse) {
        this.isReply = true;
        this.selectedComment = comment;
    }

    cancelReplyToComment() {
        this.isReply = false;
        this.selectedComment = {
            id: 0,
            postId: 0,
            authorName: '',
            authorAvatarUrl: '',
            content: '',
            parentId: 0,
            children: [],
        };
    }
}
