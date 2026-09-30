import { ChangeDetectionStrategy, Component, computed, effect, inject, signal } from '@angular/core';
import { DOCUMENT } from '@angular/common'

import { ActivatedRoute, Router } from '@angular/router';

import { map } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';

import { Store } from '@ngrx/store';

import { AppState } from '@/app/store/app.state';
import { selectSelectedLocation } from '@/app/store/location/location.selectors';

import { LucideUtensils } from '@lucide/angular';

import { FilterBar } from '@/app/features/dashboard/components/filter-bar/filter-bar';
import { AdsCarousel } from '@/app/features/dashboard/components/ads-carousel/ads-carousel';
import { Categories } from '@/app/features/dashboard/components/categories/categories';
import { RestaurantList } from '@/app/features/dashboard/components/restaurant-list/restaurant-list';

import { PriceRange, RestaurantFilters, SortOption } from '@/app/features/dashboard/models/filter.model';
import { FilterModal } from '@/app/features/dashboard/components/filter-modal/filter-modal';
import { Modal } from '@/app/shared/components/modal/modal';
import { Restaurant } from '@/app/features/dashboard/models/restaurant.model';
import { AdsCarouselSkeleton } from '@/app/features/dashboard/components/skeletons/ads-carousel-skeleton/ads-carousel-skeleton';
import { CategoriesSkeleton } from '@/app/features/dashboard/components/skeletons/categories-skeleton/categories-skeleton';
import { RestaurantListSkeleton } from '@/app/features/dashboard/components/skeletons/restaurant-list-skeleton/restaurant-list-skeleton';
import { Category } from '@/app/features/dashboard/models/category.model';
import { RestaurantService } from '@/app/features/dashboard/services/restuarant.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [FilterBar, Modal, FilterModal, AdsCarousel, Categories, RestaurantList, AdsCarouselSkeleton, CategoriesSkeleton, RestaurantListSkeleton, LucideUtensils],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.sass',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Dashboard {

  private readonly document = inject(DOCUMENT);

  private readonly store = inject(Store<AppState>);

  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  private readonly restaurantService = inject(RestaurantService);

  readonly showFilterModal = signal(false);

  readonly selectedLocation =
    this.store.selectSignal(
      selectSelectedLocation
    );

  readonly restaurants = signal<Restaurant[]>([]);
  readonly filteredRestaurants = signal<Restaurant[]>([]);

  readonly filterLoading = signal(false);
  readonly loading = signal(false);
  readonly error = signal<string | null>(null);

  private readonly locationEffect = effect(() => {

    const location =
      this.selectedLocation();

    if (!location) {
      return;
    }

    this.loadRestaurants();
  });


  private readonly filterEffect = effect(() => {

    const filters = this.filters();

    if (!Object.keys(filters).length) {

      this.filteredRestaurants.set([]);

      return;
    }

    this.loadFilteredRestaurants(filters);
  });

  openFilters(): void {
    this.document.body.style.overflow = 'hidden';

    this.showFilterModal.set(true);
  }


  closeFilters(): void {
    this.document.body.style.overflow = '';

    this.showFilterModal.set(false);
  }


  readonly hasFilters =
    computed(() => {

      const filters =
        this.filters();

      return Object.keys(filters).length > 0;
    });


  readonly filters =
    toSignal(
      this.route.queryParamMap.pipe(
        map(params => {

          const filters: RestaurantFilters = {};

          // Search

          const food =
            params.get('food');

          const cuisine =
            params.get('cuisine');


          // Restaurant characteristics

          const restaurant =
            params.get('restaurant');

          const collection =
            params.get('collection');


          // Dietary

          const veg =
            params.get('veg');

          const egg =
            params.get('egg');

          const nonVeg =
            params.get('nonVeg');

          const vegan =
            params.get('vegan');

          const halal =
            params.get('halal');


          // Rating

          const rating =
            params.get('rating');


          // Price

          const price =
            params.get('price');


          // Delivery

          const maxDeliveryTime =
            params.get('maxDeliveryTime');


          // Distance

          const maxDistance =
            params.get('maxDistance');


          // Offers / availability

          const offers =
            params.get('offers');

          const openNow =
            params.get('openNow');


          // Sorting

          const sort =
            params.get('sort');


          // Build filters

          if (food) {
            filters.food = food;
          }

          if (cuisine) {
            filters.cuisine = cuisine;
          }

          if (restaurant) {
            filters.restaurant = restaurant;
          }

          if (collection) {
            filters.collection = collection;
          }


          if (veg === 'true') {
            filters.veg = true;
          }

          if (nonVeg === 'true') {
            filters.nonVeg = true;
          }

          if (egg === 'true') {
            filters.egg = true;
          }

          if (vegan === 'true') {
            filters.vegan = true;
          }

          if (halal === 'true') {
            filters.halal = true;
          }


          if (rating) {
            filters.rating = Number(rating);
          }


          if (price) {
            filters.price = price as PriceRange
          }


          if (maxDeliveryTime) {
            filters.maxDeliveryTime =
              Number(maxDeliveryTime);
          }

          if (maxDistance) {
            filters.maxDistance =
              Number(maxDistance);
          }


          if (offers === 'true') {
            filters.offers = true;
          }

          if (openNow === 'true') {
            filters.openNow = true;
          }


          if (sort) {
            filters.sort = sort as SortOption;
          }


          return filters;
        })
      ),
      {
        initialValue: {} as RestaurantFilters
      }
    );

  removeFilter(key: keyof RestaurantFilters): void {

    this.router.navigate([], {
      queryParams: {
        [key]: null
      },
      queryParamsHandling: 'merge'
    });

  }

  applyFilters(filters: RestaurantFilters): void {

    this.router.navigate([], {
      queryParams: {
        food: filters.food || null,
        cuisine: filters.cuisine || null,

        restaurant: filters.restaurant || null,
        collection: filters.collection || null,

        veg: filters.veg || null,
        nonVeg: filters.nonVeg || null,
        egg: filters.egg || null,
        vegan: filters.vegan || null,
        halal: filters.halal || null,

        rating: filters.rating || null,

        price: filters.price || null,

        maxDeliveryTime:
          filters.maxDeliveryTime || null,

        maxDistance:
          filters.maxDistance || null,

        offers: filters.offers || null,
        openNow: filters.openNow || null,

        sort: filters.sort || null
      },
      queryParamsHandling: 'merge'
    });

    this.closeFilters();
  }



  onCategorySelected(category: Category): void {

    this.router.navigate([], {
      queryParams: {
        food: category.type === 'food'
          ? category.id
          : null,

        cuisine: category.type === 'cuisine'
          ? category.id
          : null
      },
      queryParamsHandling: 'merge'
    });
  }

  private loadRestaurants(): void {

    const location = this.selectedLocation();

    if (!location) {
      return;
    }

    this.loading.set(true);

    this.restaurantService
      .getRestaurants(
        location.city,
        location.longitude,
        location.latitude
      )
      .subscribe({

        next: response => {

          this.restaurants.set([
            ...response.data
          ]);

          this.loading.set(false);
        },

        error: error => {

          console.error(error);

          this.restaurants.set([]);

          this.error.set(
            'Unable to load restaurants.'
          );

          this.loading.set(false);
        }

      });
  }

  private loadFilteredRestaurants(
    filters: RestaurantFilters
  ): void {

    const location = this.selectedLocation();

    if (!location) {
      return;
    }

    this.filterLoading.set(true);

    this.restaurantService
      .getFilteredRestaurants(
        filters,
        location.city,
        location.longitude,
        location.latitude
      )
      .subscribe({

        next: response => {

          this.filteredRestaurants.set([
            ...response.data
          ]);

          this.filterLoading.set(false);
        },

        error: error => {

          console.error(error);

          this.filteredRestaurants.set([]);

          this.filterLoading.set(false);
        }

      });
  }

  onVegChanged(veg: boolean): void {

    this.router.navigate([], {
      queryParams: {
        veg: veg ? true : null,

        // Clear mutually exclusive dietary filters
        nonVeg: null,
        vegan: null,
        halal: null
      },
      queryParamsHandling: 'merge'
    });

  }

  onSortChanged(sort: SortOption | null): void {
    this.router.navigate([], {
      queryParams: {
        sort
      },
      queryParamsHandling: 'merge'
    });
  }

  exploreRestaurants(): void {

    this.router.navigate([], {
      queryParams: {
        food: null,
        cuisine: null,

        restaurant: null,
        collection: null,

        veg: null,
        nonVeg: null,
        vegan: null,
        halal: null,

        rating: null,
        price: null,

        maxDeliveryTime: null,
        maxDistance: null,

        offers: null,
        openNow: null,

        sort: null
      },
      queryParamsHandling: 'merge'
    });

    this.filteredRestaurants.set([]);
  }
}