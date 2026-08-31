import { ChangeDetectionStrategy, Component, DestroyRef, EventEmitter, Output, inject, signal } from '@angular/core';

import {
  AsyncPipe
} from '@angular/common';

import {
  HttpClient,
  HttpParams
} from '@angular/common/http';

import {
  Router,
  RouterLink
} from '@angular/router';

import {
  debounceTime,
  filter,
  map,
  tap,
  distinctUntilChanged,
  of,
  Subject,
  switchMap,
  catchError
} from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faLocationCrosshairs, faLocationDot, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

import { Store } from '@ngrx/store';
import { LocationSearchResult, ReverseGeocodeResult } from '../../../core/location/models/location-api.model';

import { SelectedLocation } from '../../../core/location/models/location.model';

import { LocationService } from '../../../core/location/services/location.service';
import { AuthService } from '../../../core/services/auth.service';

import * as LocationActions from '../../../store/location/location.actions';
import { selectSelectedLocation } from '../../../store/location/location.selectors';

import { Loader } from '../loader/loader';

import { AppState } from '../../../store/app.state';
import * as AuthActions from '../../../store/auth/auth.actions';
import { selectAuthInitialized, selectUser } from '../../../store/auth/auth.selectors';
import { FormsModule } from '@angular/forms';
import { Button } from '../button/button';

import { ClickOutsideDirective } from '../../directive/clickOutside.directive';
import { SlugPipe } from '../../pipes/slug.pipe';


interface RestaurantResult {
  _id: string;
  name: string;
  slug: string;
}

interface FoodResult {
  _id: string;
  name: string;
}

interface SearchResponse {
  data?: {
    restaurants?: RestaurantResult[];
    foods?: FoodResult[];
    cuisines?: string[];
  };
}


@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [AsyncPipe, FontAwesomeModule, FormsModule, ClickOutsideDirective, Button, Loader, RouterLink],
  templateUrl: './navbar.html',
  styleUrl: './navbar.sass',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Navbar {

  @Output()
  readonly openAuth =
    new EventEmitter<void>();


  readonly faLocationDot =
    faLocationDot;

  readonly faLocationCrosshairs =
    faLocationCrosshairs;

  readonly faMagnifyingGlass =
    faMagnifyingGlass;



  readonly detectLocationLoader = signal(false);


  locationQuery = '';
  restaurantQuery = '';

  locationResults: LocationSearchResult[] = [];
  restaurantResults: RestaurantResult[] = [];

  foodResults: FoodResult[] = [];

  cuisineResults: string[] = [];


  showLocationDropdown = false;

  showRestaurantDropdown = false;

  restaurantSearchCompleted = false;

  locationLoading = signal(false);
  restaurantLoading = signal(false);

  private readonly store = inject(Store<AppState>);
  private readonly router = inject(Router);
  private readonly http = inject(HttpClient);
  private readonly locationService = inject(LocationService);

  private readonly authService = inject(AuthService);
  private readonly destroyRef = inject(DestroyRef);

  readonly slugPipe = inject(SlugPipe);

  private readonly locationSearchSubject = new Subject<string>();
  private readonly restaurantSearchSubject = new Subject<string>();

  readonly user$ = this.store.select(selectUser);

  selectedLocation = this.store.selectSignal(
    selectSelectedLocation
  );

  readonly authInitialized$ = this.store.select(selectAuthInitialized);

  ngOnInit(): void {
    this.initializeLocationSearch();

    this.initializeRestaurantSearch();
  }

  logout(): void {

    this.store.dispatch(
      AuthActions.logout()
    );
  }

  private initializeLocationSearch(): void {

    this.locationSearchSubject
      .pipe(
        map(query => query.trim()),

        debounceTime(300),

        distinctUntilChanged(),

        tap(query => {

          if (!query) {
            this.locationLoading.set(false);
            this.locationResults = [];

            return;
          }

          this.locationLoading.set(true);
        }),

        switchMap(query => {

          if (!query) {
            return of(
              [] as LocationSearchResult[]
            );
          }

          return this.locationService
            .search(query)
            .pipe(
              map(data =>
                Array.isArray(data)
                  ? data as LocationSearchResult[]
                  : []
              ),
              catchError(() => of([]))
            );
        }),

        takeUntilDestroyed(this.destroyRef)
      )

      .subscribe(results => {

        this.locationResults =
          results;

        this.locationLoading.set(false);
      });
  }


  // ==============================
  // RESTAURANT SEARCH
  // ==============================

  private initializeRestaurantSearch(): void {

    this.restaurantSearchSubject
      .pipe(

        map((query: string) =>
          query.trim()
        ),

        debounceTime(300),

        distinctUntilChanged(),

        tap(query => {

          if (query.length < 2) {

            this.restaurantLoading
              .set(false);

            this.restaurantResults = [];

            this.foodResults = [];

            this.cuisineResults = [];

            this.restaurantSearchCompleted =
              false;

            return;
          }


          this.restaurantLoading
            .set(true);

          this.restaurantSearchCompleted =
            false;

        }),

        filter(query =>
          query.length >= 2
        ),

        switchMap(query => {

          const params =
            new HttpParams()
              .set(
                'keyword',
                query
              );


          return this.http
            .get<SearchResponse>(
              '/api/v1/search/search-items',
              { params }
            )

            .pipe(

              catchError(() =>
                of<SearchResponse>({
                  data: {
                    restaurants: [],
                    foods: [],
                    cuisines: []
                  }
                })
              )
            );
        }),

        takeUntilDestroyed(
          this.destroyRef
        )
      )

      .subscribe(results => {

        this.restaurantResults = results.data?.restaurants ?? [];

        this.foodResults = results.data?.foods ?? [];

        this.cuisineResults = results.data?.cuisines ?? [];

        this.restaurantLoading.set(false);


        this.restaurantSearchCompleted =
          true;
      });
  }


  // ==============================
  // DROPDOWNS
  // ==============================

  toggleLocationDropdown(): void {
    this.showLocationDropdown = !this.showLocationDropdown;

    this.showRestaurantDropdown =
      false;
  }


  toggleRestaurantDropdown(): void {
    this.showRestaurantDropdown =
      !this.showRestaurantDropdown;

    this.showLocationDropdown =
      false;
  }

  private clearLocationSearch(): void {

    this.locationSearchSubject
      .next('');

    this.locationQuery = '';

    this.locationResults = [];

    this.locationLoading
      .set(false);
  }


  private clearRestaurantSearch(): void {

    this.restaurantSearchSubject
      .next('');

    this.restaurantQuery = '';

    this.restaurantResults = [];

    this.foodResults = [];

    this.cuisineResults = [];

    this.restaurantLoading
      .set(false);
  }

  closeDropdown(): void {

    this.showLocationDropdown = false;
    this.showRestaurantDropdown = false;

    this.clearLocationSearch();
    this.clearRestaurantSearch();
  }

  // ==============================
  // LOCATION INPUT
  // ==============================

  onLocationQueryChange(
    query: string
  ): void {

    this.locationQuery =
      query;
    if (!query.trim()) {

      this.locationResults = [];

      return;
    }

    this.locationLoading.set(true);

    this.locationService
      .search(query.trim())
      .pipe(
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe({

        next: results => {

          this.locationResults = results;

          this.locationLoading.set(false);
        },

        error: () => {

          this.locationResults = [];

          this.locationLoading.set(false);
        }

      });
  }



  onRestaurantQueryChange(query: string): void {

    this.restaurantQuery =
      query;

    this.showRestaurantDropdown =
      true;


    if (!query.trim()) {

      this.restaurantSearchCompleted =
        false;

      this.restaurantResults = [];

      this.foodResults = [];

      this.cuisineResults = [];
    }


    this.restaurantSearchSubject
      .next(query);
  }


  // ==============================
  // SELECT LOCATION
  // ==============================

  selectLocation(item: LocationSearchResult): void {

    const slug = this.slugPipe.transform(item.text);

    const [longitude, latitude] = item.center;


    const location: SelectedLocation = {

      city:
        item.text,

      slug,

      latitude,

      longitude,

      source:
        'search'
    };


    this.store.dispatch(
      LocationActions.selectLocation({
        location
      })
    );


    this.locationResults = [];

    this.locationQuery = '';

    this.showLocationDropdown = false;


    this.router.navigate(
      ['/india', slug],
      {
        replaceUrl: true
      }

    );
  }


  private handleDetectedLocation(latitude: number, longitude: number): void {

    this.locationService
      .reverseGeocode(
        latitude,
        longitude
      )
      .pipe(
        takeUntilDestroyed(
          this.destroyRef
        )
      )
      .subscribe({

        next: (
          data: ReverseGeocodeResult
        ) => {

          const city =
            data.context?.[2]?.text;


          if (!city) {
            this.detectLocationLoader.set(
              false
            );
            return;
          }


          const slug = this.slugPipe.transform(city);


          const location: SelectedLocation = {

            city,

            slug,

            latitude,

            longitude,

            source:
              'gps'
          };


          this.store.dispatch(LocationActions.selectLocation({
            location
          })
          );


          this.showLocationDropdown = false;


          this.locationQuery = '';


          this.locationResults = [];


          this.router.navigate(
            ['/india', slug],
            {
              replaceUrl: true
            }
          );


          this.detectLocationLoader.set(false);

        },

        error: () => {
          this.detectLocationLoader.set(false);

          this.showLocationDropdown = false;

        }

      });
  }

  detectLocation(): void {

    if (!navigator.geolocation)
      return;

    this.detectLocationLoader.set(true);

    navigator.geolocation.getCurrentPosition(
      position => {
        const latitude =
          position.coords.latitude;

        const longitude =
          position.coords.longitude;

        this.handleDetectedLocation(
          latitude,
          longitude
        );

      },

      () => {
        this.detectLocationLoader.set(
          false
        );

      }

    );
  }


  selectRestaurant(restaurant: RestaurantResult): void {

    this.closeSearchDropdown();

    const restaurantSlug = this.slugPipe.transform(restaurant.slug);

    const location = this.selectedLocation();

    if (!location) {
      return;
    }


    this.router.navigate([
      '/india',
      location.city,
      'r',
      restaurantSlug
    ]);
  }




  selectCuisine(cuisine: string): void {

    this.closeSearchDropdown();

    const location = this.selectedLocation();

    if (!location) {
      return;
    }

    this.router.navigate(
      ['/india', location.city],
      {
        queryParams: {
          cuisine
        }
      }
    );


  }


  selectFood(food: FoodResult): void {

    this.closeSearchDropdown();

    const location = this.selectedLocation();

    if (!location) {
      return;
    }

    this.router.navigate(
      ['/india', location.city],
      {
        queryParams: {
          food: food.name
        }
      }
    );
  }


  goToProfile(
    user: string
  ): void {

    this.router.navigate([
      '/users',
      user
    ]);
  }


  private closeSearchDropdown(): void {

    this.showRestaurantDropdown =
      false;

    this.restaurantQuery = '';
  }


  // ==============================
  // HELPERS
  // ==============================

  toTitleCase(
    value: string | null
  ): string {

    if (!value)
      return '';


    return value
      .split(/\s+/)
      .filter(Boolean)
      .map(word =>
        word.charAt(0).toUpperCase() +
        word.slice(1).toLowerCase()
      )
      .join(' ');
  }

}