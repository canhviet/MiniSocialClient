import { Component } from '@angular/core';
import { DataResponse, Post, User } from '../../../types';
import { PostService } from '../../_services/post.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrl: './home.component.css',
})
export class HomeComponent {
    constructor(private postService: PostService) {}

    posts: Post[] = [];

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
}
