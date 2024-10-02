import { HttpContext, HttpHeaders, HttpParams } from '@angular/common/http';

export interface Options {
    headers?:
        | HttpHeaders
        | {
              [header: string]: string | string[];
          };
    observe?: 'body';
    context?: HttpContext;
    params?:
        | HttpParams
        | {
              [param: string]:
                  | string
                  | number
                  | boolean
                  | ReadonlyArray<string | number | boolean>;
          };
    reportProgress?: boolean;
    responseType?: 'json';
    withCredentials?: boolean;
    transferCache?:
        | {
              includeHeaders?: string[];
          }
        | boolean;
}

export interface PaginationParams {
    [param: string]:
        | string
        | number
        | boolean
        | ReadonlyArray<string | number | boolean>;
    pageNo: number;
    pageSize: number;
}

export interface UsersData {
    items: User[];
    pageNo: number;
    pageSize: number;
    totalPage: number;
}

export interface DataResponse {
    status: number;
    message: string;
    data: any;
}

export interface User {
    id: number;
    phone: string;
    name: string;
    dateOfBirth: string;
    email: string;
    gender: string;
    username: string;
    userStatus: string;
    avatar: string | null;
}

export interface WebSocketResponse {
    type: string;
    data: any;
}

export interface MessageResponse {
    messageId: number;
    senderId: number;
    receiverId: number;
    content: string;
    timestamp: Date;
}

export interface MessageRequest {
    conversationId: number;
    senderId: number;
    receiverId: number;
    content: string;
    timestamp: Date;
}

export interface ConversationResponse {
    conversationId: number;
    otherUserId: number;
    otherUserName: string;
    lastMessage: string;
    lastMessageTimestamp: string;
}

export interface Post {
    id?: number;
    userId: number;
    image: string;
    title: string;
}
