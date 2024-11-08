import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { PaginationParams, DataResponse, User } from '../../types';
import { Observable } from 'rxjs';
@Injectable({
    providedIn: 'root',
})
export class UserService {
    constructor(private apiService: ApiService) {}

    getUsers = (
        url: string,
        params: PaginationParams
    ): Observable<DataResponse> => {
        return this.apiService.get(url, {
            params,
            responseType: 'json',
        });
    };

    // Retrieve a list of all users except the currently logged-in user
    getAllUsersExceptCurrentUser = (url: string): Observable<DataResponse> => {
        return this.apiService.get<DataResponse>(url, { responseType: 'json' });
    };

    getById = (url: string): Observable<DataResponse> => {
        return this.apiService.get(url, { responseType: 'json' });
    };

    // Retrieve the conversation ID between two users
    getConversationIdByUser1IdAndUser2Id = (
        url: string,
        user1Id: number,
        user2Id: number
    ): Observable<DataResponse> => {
        return this.apiService.get<DataResponse>(url, {
            params: { user1Id: user1Id, user2Id: user2Id },
            responseType: 'json',
        });
    };

    // Retrieve the currently logged-in user from local storage
    getCurrentUser = (): Observable<DataResponse> => {
        return this.apiService.get<DataResponse>(
            'http://localhost:8080/user/' + sessionStorage.getItem('userId'),
            { responseType: 'json' }
        );
    };

    addUser = (url: string, body: any): Observable<any> => {
        return this.apiService.post(url, body, {});
    };

    updateUser = (url: string, body: any): Observable<any> => {
        return this.apiService.put(url, body, {});
    };

    register = (url: string, body: any): Observable<any> => {
        return this.apiService.post(url, body, {
            responseType: 'text' as 'json',
        });
    };
}
