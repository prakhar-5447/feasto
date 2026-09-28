import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
} from '@angular/core';

import { FormsModule } from '@angular/forms';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

import {
  debounceTime,
  distinctUntilChanged,
  filter,
  tap,
  map,
  of,
  Subject,
  switchMap,
  catchError,
} from 'rxjs';

import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { Store } from '@ngrx/store';
import { Router } from '@angular/router';

import { AppState } from '@/app/store/app.state';
import { selectSelectedLocation } from '@/app/store/location/location.selectors';

import {
  FoodResult,
  RestaurantResult,
} from '@/app/features/restaurant/models/restaurant-search.model';

import { RestaurantService } from '@/app/features/restaurant/services/restaurant.service';

import { SlugPipe } from '@/app/shared/pipes/slug.pipe';
import { ClickOutsideDirective } from '@/app/shared/directive/clickOutside.directive';

@Component({
  selector: 'app-restaurant-picker',
  standalone: true,
  imports: [
    FormsModule,
    FontAwesomeModule,
    ClickOutsideDirective,
  ],
  templateUrl: './restaurant-picker.html',
  styleUrl: './restaurant-picker.sass',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RestaurantPicker {
  readonly faMagnifyingGlass = faMagnifyingGlass;

  restaurantQuery = '';

  restaurantResults: RestaurantResult[] = [];
  foodResults: FoodResult[] = [];
  cuisineResults: string[] = [];

  restaurantLoading = false;
  restaurantSearchCompleted = false;

  showDropdown = false;

  private readonly store = inject(Store<AppState>);
  private readonly router = inject(Router);
  private readonly slugPipe = inject(SlugPipe);
  private readonly restaurantService = inject(RestaurantService);

  readonly selectedLocation =
    this.store.selectSignal(
      selectSelectedLocation
    );

  private readonly searchSubject =
    new Subject<string>();

  private readonly destroyRef =
    inject(DestroyRef);

  constructor() {
    this.initializeSearch();
  }

  private initializeSearch(): void {
    this.searchSubject
      .pipe(
        map(query => query.trim()),

        debounceTime(300),

        distinctUntilChanged(),

        tap(() => {
          this.restaurantLoading = true;
          this.restaurantSearchCompleted = false;
        }),

        filter(query => query.length >= 2),

        switchMap(query =>
          this.restaurantService
            .searchItems(query)
            .pipe(
              catchError(() =>
                of({
                  data: {
                    restaurants: [],
                    foods: [],
                    cuisines: [],
                  },
                })
              )
            )
        ),

        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe(response => {
        this.restaurantResults =
          response.data?.restaurants ?? [];

        this.foodResults =
          response.data?.foods ?? [];

        this.cuisineResults =
          response.data?.cuisines ?? [];

        this.restaurantLoading = false;
        this.restaurantSearchCompleted = true;
      });
  }

  onQueryChange(query: string): void {
    this.restaurantQuery = query;
    this.showDropdown = true;

    if (!query.trim()) {
      this.clearResults();
      return;
    }

    this.searchSubject.next(query);
  }

  selectRestaurant(
    restaurant: RestaurantResult
  ): void {
    const location =
      this.selectedLocation();

    if (!location) {
      return;
    }

    this.closeDropdown();

    const restaurantSlug =
      this.slugPipe.transform(
        restaurant.slug
      );

    this.router.navigate([
      '/india',
      location.slug,
      'r',
      restaurantSlug,
    ]);
  }

  selectFood(food: FoodResult): void {
    const location =
      this.selectedLocation();

    if (!location) {
      return;
    }

    this.closeDropdown();

    this.router.navigate(
      ['/india', location.slug],
      {
        queryParams: {
          food: food.name,
        },
      }
    );
  }

  selectCuisine(cuisine: string): void {
    const location =
      this.selectedLocation();

    if (!location) {
      return;
    }

    this.closeDropdown();

    this.router.navigate(
      ['/india', location.slug],
      {
        queryParams: {
          cuisine,
        },
      }
    );
  }

  closeDropdown(): void {
    this.showDropdown = false;
    this.clearSearch();
  }

  private clearSearch(): void {
    this.searchSubject.next('');

    this.restaurantQuery = '';

    this.clearResults();

    this.restaurantLoading = false;
  }

  private clearResults(): void {
    this.restaurantResults = [];
    this.foodResults = [];
    this.cuisineResults = [];

    this.restaurantSearchCompleted = false;
  }
}