import { inject, Injectable } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';

import { RestaurantFilters } from '../models/restaurant-filter.model';

@Injectable({
    providedIn: 'root'
})
export class RestaurantFilterService {

    private readonly router = inject(Router);

    private readonly route = inject(ActivatedRoute);

    setFilters(filters: RestaurantFilters): void {

        this.router.navigate([], {
            queryParams: {
                food: filters.food || null,
                cuisine: filters.cuisine || null,
                rating: filters.rating ?? null,
                veg: filters.veg ?? null,
                nonVeg: filters.nonVeg ?? null,
                vegan: filters.vegan ?? null,
                halal: filters.halal ?? null,
                price: filters.price || null,
                maxDeliveryTime:
                    filters.maxDeliveryTime ?? null,
                maxDistance:
                    filters.maxDistance ?? null,
                offers:
                    filters.offers ?? null,
                openNow:
                    filters.openNow ?? null,
                sort:
                    filters.sort || null
            },
            queryParamsHandling: 'merge'
        });
    }

    removeFilter(filter: keyof RestaurantFilters): void {

        this.router.navigate([], {
            queryParams: {
                [filter]: null
            },
            queryParamsHandling: 'merge'
        });
    }

    clearFilters(): void {

        this.router.navigate([], {
            queryParams: {
                food: null,
                cuisine: null,
                rating: null,
                veg: null,
                nonVeg: null,
                vegan: null,
                halal: null,
                price: null,
                maxDeliveryTime: null,
                maxDistance: null,
                offers: null,
                openNow: null,
                sort: null
            },
            queryParamsHandling: 'merge'
        });
    }
}