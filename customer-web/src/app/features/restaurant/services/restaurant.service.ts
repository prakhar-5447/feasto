import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import {
    RestaurantSearchResponse,
} from '@/app/features/restaurant/models/restaurant-search.model';

@Injectable({
    providedIn: 'root',
})
export class RestaurantService {
    constructor(
        private readonly http: HttpClient
    ) { }

    searchItems(
        keyword: string
    ): Observable<RestaurantSearchResponse> {
        const params = new HttpParams()
            .set('keyword', keyword);

        return this.http.get<RestaurantSearchResponse>(
            '/api/v1/search/search-items',
            { params }
        );
    }
}