import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    EventEmitter,
    Input,
    Output,
} from '@angular/core';
import { DataResponse, Post, User } from '../../../types';
import { UserService } from '../../_services/user.service';

@Component({
    selector: 'app-post',
    templateUrl: './post.component.html',
    styleUrl: './post.component.css',
})
export class PostComponent {
    constructor(private userService: UserService) {}

    postUser: User = {
        id: 0,
        phone: '',
        name: '',
        dateOfBirth: '',
        email: '',
        gender: '',
        username: '',
        userStatus: '',
        avatar: null,
    };

    getPostUser(userId: number) {
        this.userService
            .getById('http://localhost:8080/user/' + userId)
            .subscribe({
                next: (res: DataResponse) => {
                    this.postUser = res.data;
                    console.log(this.postUser);
                },
                error: (error) => {
                    console.log(error);
                },
            });
    }

    @Input() post!: Post;
    @Output() postEmitted = new EventEmitter<Post>();

    ngOnInit() {
        this.postEmitted.emit(this.post);
        this.getPostUser(this.post.userId);
    }
}
