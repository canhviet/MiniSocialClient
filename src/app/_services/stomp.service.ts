import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs';
import SockJS from 'sockjs-client'; // Use default import
import * as Stomp from 'stompjs';

@Injectable({
    providedIn: 'root',
})
export class StompService {
    socket: any;
    stompClient: any;

    constructor() {
        this.socket = new SockJS('http://localhost:8080/stomp-endpoint');
        this.stompClient = Stomp.over(this.socket);
        this.stompClient.debug = null;
        this.stompClient.connect();
    }

    // Subscribe to a specific topic and provide a callback function to handle incoming messages
    subscribe(topic: string, callback: any): Subscription {
        return this.stompClient.subscribe(
            '/topic/' + topic,
            (frame: any): any => {
                // Parse the message body and pass it to the callback function
                callback(JSON.parse(frame.body));
            }
        );
    }

    // Send a message to a specific application using Stomp
    send(app: string, data: any) {
        this.stompClient.send('/app/' + app, {}, JSON.stringify(data));
    }
}
