import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import {
    Restaurant,
} from '@/app/features/dashboard/models/restaurant.model';
import { RestaurantFilters } from '@/app/features/dashboard/models/filter.model';

@Injectable({
    providedIn: 'root'
})
export class RestaurantService {

    constructor(
        private readonly http: HttpClient
    ) { }

    getRestaurants(
        city: string,
        longitude: number,
        latitude: number
    ): Observable<{ data: Restaurant[] }> {

        const params = new HttpParams()
            .set('city', city)
            .set('longitude', longitude.toString())
            .set('latitude', latitude.toString());

        return this.http.get<{ data: Restaurant[] }>(
            '/api/v1/foods/filter',
            { params }
        );
    }

    getFilteredRestaurants(
        filters: RestaurantFilters,
        city: string,
        longitude: number,
        latitude: number
    ): Observable<{ data: Restaurant[] }> {

        let params = new HttpParams()
            .set('city', city)
            .set('longitude', longitude.toString())
            .set('latitude', latitude.toString());

        if (filters.food) {
            params = params.set('food', filters.food);
        }

        if (filters.cuisine) {
            params = params.set('cuisine', filters.cuisine);
        }

        if (filters.restaurant) {
            params = params.set('restaurant', filters.restaurant);
        }

        if (filters.collection) {
            params = params.set('collection', filters.collection);
        }

        if (filters.veg) {
            params = params.set('veg', 'true');
        }

        if (filters.nonVeg) {
            params = params.set('nonVeg', 'true');
        }

        if (filters.vegan) {
            params = params.set('vegan', 'true');
        }

        if (filters.halal) {
            params = params.set('halal', 'true');
        }

        if (filters.rating) {
            params = params.set(
                'rating',
                String(filters.rating)
            );
        }

        if (filters.price) {
            params = params.set(
                'price',
                filters.price
            );
        }

        if (filters.maxDeliveryTime) {
            params = params.set(
                'maxDeliveryTime',
                String(filters.maxDeliveryTime)
            );
        }

        if (filters.maxDistance) {
            params = params.set(
                'maxDistance',
                String(filters.maxDistance)
            );
        }

        if (filters.offers) {
            params = params.set('offers', 'true');
        }

        if (filters.openNow) {
            params = params.set('openNow', 'true');
        }

        if (filters.sort) {
            params = params.set(
                'sort',
                filters.sort
            );
        }

        return this.http.get<{ data: Restaurant[] }>(
            '/api/v1/foods/filter',
            { params }
        );
    }
}