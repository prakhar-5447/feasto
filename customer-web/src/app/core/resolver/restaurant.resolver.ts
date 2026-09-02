import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { RestaurantDetail } from '../../core/restaurant/models/restaurant.model';
import { map } from 'rxjs';

export const restaurantResolver: ResolveFn<RestaurantDetail> = route => {
    const http = inject(HttpClient);

    const city = route.parent?.paramMap.get('city');
    const slug = route.paramMap.get('restaurant');

    if (!city || !slug) {
        console.log(city);
        console.log(slug);
        throw new Error('Invalid restaurant route');
    }

    return http
        .get<{ data: RestaurantDetail }>(
            `/api/v1/restaurants/slug/${slug}`
        )
        .pipe(
            map(response => response.data)
        );
};