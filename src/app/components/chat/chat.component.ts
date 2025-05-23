import { Component, OnDestroy, OnInit } from '@angular/core';
import {
    ConversationResponse,
    DataResponse,
    MessageRequest,
    MessageResponse,
    User,
    WebSocketResponse,
} from '../../../types';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../_services/user.service';
import { StompService } from '../../_services/stomp.service';
import { DatePipe } from '@angular/common';

@Component({
    selector: 'app-chat',
    templateUrl: './chat.component.html',
    styleUrl: './chat.component.scss',
})
export class ChatComponent implements OnInit, OnDestroy {
    currentUser: User = {
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

    receiverUser: User = {
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

    users: User[] = [];

    userConversations: ConversationResponse[] = [];

    stompUserSub: Subscription | undefined;

    selectedConversationId: number = -1;

    selectedConversation: MessageResponse[] = [];

    // selected conversation messages subscription
    stompConvSub: Subscription | undefined;

    // Boolean flag to indicate whether showing users or conversation on left column
    showUserState: boolean = false;
    // Input field for send message
    message: string = '';

    isEmojiPickerVisible: boolean = false;

    constructor(
        private router: Router,
        private userService: UserService,
        private stomp: StompService,
        private datePipe: DatePipe,
        private route: ActivatedRoute
    ) {}

    ngOnInit(): void {
        // Subscribe to userId websocket to get updated conversation when gets new messages
        this.subscribeToCurrentUserConversation();

        this.userService.getCurrentUser().subscribe({
            next: (res: DataResponse) => {
                this.currentUser = res.data;
            },
        });

        this.route.params.subscribe((params) => {
            this.subscribeToCurrentUserConversation();

            this.receiverUser.id = +params['receiverId'];

            this.userService
                .getById('http://localhost:8080/user/' + this.receiverUser.id)
                .subscribe({
                    next: (res: DataResponse) => {
                        this.receiverUser = res.data;
                        this.userService
                            .getConversationIdByUser1IdAndUser2Id(
                                'http://localhost:8080/user/conversation/id',
                                this.receiverUser.id,
                                this.currentUser.id
                            )
                            .subscribe((res: DataResponse) => {
                                this.selectedConversationId = res.data;

                                this.showUserState = false;

                                // Get conversations of user
                                this.userService
                                    .getAllUsersExceptCurrentUser(
                                        'http://localhost:8080/user/except/' +
                                            sessionStorage.getItem('userId')
                                    )
                                    .subscribe((res: DataResponse) => {
                                        this.users = res.data;
                                    });

                                this.setConversation();
                            });
                    },
                });
        });
    }

    ngOnDestroy(): void {
        // Unsubscribe from all channels onDestroy
        this.stompUserSub?.unsubscribe();
        this.stompConvSub?.unsubscribe();
    }

    // When click the new/add button Then get all users and set users list
    onShowHideUserConversation() {
        this.showUserState = !this.showUserState;
    }

    // Close a chat from dropdown menu
    onCloseChat() {
        this.stompConvSub?.unsubscribe();
        this.selectedConversationId = -1;
    }

    subscribeToCurrentUserConversation() {
        // setting one second delayed to successfully connect the stomp to server
        setTimeout(() => {
            this.stompUserSub = this.stomp.subscribe(
                'user/' + this.currentUser.id,
                (payload: any) => {
                    let res: WebSocketResponse = payload;
                    if (res.type == 'ALL') {
                        this.userConversations = res.data;
                        const found = this.userConversations.find(
                            (item) =>
                                item.conversationId ===
                                this.selectedConversationId
                        );
                        if (found === undefined) {
                            this.onCloseChat();
                        }
                    }
                }
            );
            // Notify that I'm subscribed to get initial data
            this.stomp.send('user', this.currentUser.id);
        }, 1000);
    }

    // When new or exiting user selected Then set the variables and get the two users
    // conversationId from the database
    onUserSelected(receiverId: number) {
        this.Navigate(receiverId);
    }

    // When user select a conversation from the list
    onConversationSelected(receiverId: number) {
        this.Navigate(receiverId);
    }

    // Set a conversation of selected conversationId
    setConversation() {
        // unsubscribe any previous subscription
        this.stompConvSub?.unsubscribe();
        // then subscribe to selected conversation
        // when get new message then add the message to first of the array
        this.stompConvSub = this.stomp.subscribe(
            'conv/' + this.selectedConversationId,
            (payload: any) => {
                let res: WebSocketResponse = payload;
                if (res.type == 'ALL') {
                    this.selectedConversation = res.data;
                } else if (res.type == 'ADDED') {
                    let msg: MessageResponse = res.data;
                    this.selectedConversation.unshift(msg);
                }
            }
        );
        // Notify that I'm subscribed to get initial data
        this.stomp.send('conv', this.selectedConversationId);
    }

    // Send message to other user
    onSendMessage() {
        // If message field is empty then return
        if (this.message.trim().length == 0) return;

        const timestamp = new Date();
        let body: MessageRequest = {
            conversationId: this.selectedConversationId,
            senderId: this.currentUser.id,
            receiverId: this.receiverUser.id,
            content: this.message.trim(),
            timestamp: timestamp,
        };
        this.stomp.send('sendMessage', body);
        this.message = '';
    }

    // When click Delete chat from the dropdown menu Then delete the conversation with it's all messages
    onDeleteConversation() {
        this.stomp.send('deleteConversation', {
            conversationId: this.selectedConversationId,
            user1Id: this.currentUser.id,
            user2Id: this.receiverUser.id,
        });
    }

    // When click delete on a message menu Then delete from database Then refresh conversation list
    onDeleteMessage(messageId: number) {
        this.stomp.send('deleteMessage', {
            conversationId: this.selectedConversationId,
            messageId: messageId,
        });
    }

    transformDate(dateString: Date) {
        return this.datePipe.transform(dateString, 'short');
    }

    toggleEmojiPicker() {
        this.isEmojiPickerVisible = !this.isEmojiPickerVisible;
    }

    addEmoji(event: any) {
        this.message += event.emoji.native;
        this.isEmojiPickerVisible = false;
    }

    closeEmojiPicker() {
        this.isEmojiPickerVisible = false;
    }

    backHome() {
        this.router.navigate(['home']);
    }

    Navigate(receiverId: number) {
        this.router.navigate(['chat', receiverId]);
    }
}
