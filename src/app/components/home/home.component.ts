import { Component } from '@angular/core';
import { DataResponse, Post, User } from '../../../types';
import { PostService } from '../../_services/post.service';
import { Router } from '@angular/router';
import { UserService } from '../../_services/user.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrl: './home.component.css',
})
export class HomeComponent {
    constructor(private postService: PostService, private router: Router) {}

    posts: Post[] = [];

    selectedPost: Post = {
        userId: 0,
        image: '',
        title: '',
    };

    fetchPosts() {
        this.postService.getPosts('http://localhost:8080/post/list').subscribe({
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
    }

    redirectMessage() {
        this.router.navigate(['chat']);
    }

    onPostEmitted(post: Post) {
        this.selectedPost = post;
    }
}
