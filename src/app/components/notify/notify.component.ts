import { Component, Inject } from '@angular/core';
import { StompService } from '../../_services/stomp.service';
import { Subscription } from 'rxjs';
import { NotificationResponse, WebSocketResponse } from '../../../types';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
    selector: 'app-notify',
    templateUrl: './notify.component.html',
    styleUrl: './notify.component.css',
})
export class NotifyComponent {
    constructor(
        private stomp: StompService,
        private router: Router,
        public dialogRef: MatDialogRef<NotifyComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {}

    notifications: NotificationResponse[] = [];

    stompNotiSub: Subscription | undefined;

    ngOnInit() {
        if (!this.stomp.stompClient.connected) {
            this.stomp.stompClient.connect({}, () => {
                console.log('Connected to WebSocket');
            });
        }

        this.subscribeToCurrentUserNotification();
    }

    subscribeToCurrentUserNotification() {
        this.stompNotiSub?.unsubscribe();
        this.stompNotiSub = this.stomp.subscribe(
            'notify/' + sessionStorage.getItem('userId'),
            (payload: any) => {
                let res: WebSocketResponse = payload;
                if (res.type == 'ALL') {
                    this.notifications = res.data;
                } else if (res.type == 'FOLLOW') {
                    this.notifications.unshift(res.data);
                } else if (res.type == 'MSG') {
                    this.notifications.unshift(res.data);
                }
            }
        );
        // Notify that I'm subscribed to get initial data
        this.stomp.send('notify', sessionStorage.getItem('userId'));
    }

    onClose() {
        this.dialogRef.close();
    }

    redirectProfile(userId: Number) {
        this.onClose();
        this.router.navigate(['profile', userId]);
    }

    redirectMessage(receiverId: Number) {
        this.onClose();
        this.router.navigate(['chat', receiverId]);
    }
}
