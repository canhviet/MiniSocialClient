import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { DataResponse } from '../../types';

@Injectable({
    providedIn: 'root',
})
export class CommentService {
    constructor(private apiService: ApiService) {}
    getComments = (url: string): Observable<DataResponse> => {
        return this.apiService.get(url, { responseType: 'json' });
    };

    addComment = (url: string, body: any): Observable<any> => {
        return this.apiService.post(url, body, {});
    };
}
