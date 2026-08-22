import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  EventEmitter,
  Output,
  inject,
  signal
} from '@angular/core';

import {
  AsyncPipe
} from '@angular/common';

import {
  HttpClient,
  HttpParams
} from '@angular/common/http';

import {
  ActivatedRoute,
  NavigationEnd,
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

import {
  faLocationCrosshairs,
  faLocationDot,
  faMagnifyingGlass
} from '@fortawesome/free-solid-svg-icons';

import { Store } from '@ngrx/store';

import { LocationService, LocationServicePersistence } from '../../../core/services/location.service';
import { AuthService } from '../../../core/services/auth.service';
import { ClickOutsideDirective } from '../../directive/clickOutside.directive';
import { Loader } from '../loader/loader';

import { AppState } from '../../../store/app.state';
import * as AuthActions from '../../../store/auth/auth.actions';
import { selectUser } from '../../../store/auth/auth.selectors';
import { FormsModule } from '@angular/forms';
import { Button } from '../button/button';


interface LocationResult {
  text: string;
  place_name: string;
  context?: {
    text?: string;
  }[];
}


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

interface ReverseGeocodeResponse {
  context?: {
    text?: string;
  }[];
}

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    AsyncPipe,
    FontAwesomeModule,
    FormsModule,
    ClickOutsideDirective,
    Button,
    Loader,
    RouterLink
  ],
  templateUrl: './navbar.html',
  styleUrl: './navbar.sass',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Navbar {

  @Output() readonly openAuth = new EventEmitter<void>();

  readonly faLocationDot = faLocationDot;
  readonly faLocationCrosshairs = faLocationCrosshairs;
  readonly faMagnifyingGlass = faMagnifyingGlass;


  readonly selectedLocation = signal('Select Location');
  readonly detectLocationLoader = signal(false);

  locationQuery = '';
  restaurantQuery = '';

  locationResults: LocationResult[] = [];
  restaurantResults: RestaurantResult[] = [];
  foodResults: FoodResult[] = [];
  cuisineResults: string[] = [];

  showLocationDropdown = false;
  showRestaurantDropdown = false;

  locationLoading = signal(false);
  restaurantLoading = signal(false);

  private city = '';

  private readonly store = inject(Store<AppState>);
  private readonly router = inject(Router);
  private readonly http = inject(HttpClient);
  private readonly locationService = inject(LocationService);
  private readonly locationServicePersistence = inject(
    LocationServicePersistence
  );
  private readonly authService = inject(AuthService);
  private readonly destroyRef = inject(DestroyRef);

  private readonly locationSearchSubject = new Subject<string>();
  private readonly restaurantSearchSubject = new Subject<string>();

  readonly user$ = this.store.select(selectUser);

  ngOnInit(): void {
    this.initializeUrlCity();
    this.initializeLocationSearch();
    this.initializeRestaurantSearch();
  }

  private initializeUrlCity(): void {

    const updateCityFromUrl = (): void => {

      let route = this.router.routerState.root;

      let city: string | null = null;

      while (route) {

        const routeCity =
          route.snapshot?.paramMap?.get('city');

        if (routeCity) {
          city = routeCity;
          break;
        }

        const child = route.firstChild;

        if (!child) {
          break;
        }

        route = child;
      }

      if (!city) {

        this.city = '';

        this.selectedLocation.set(
          'Select Location'
        );

        return;
      }

      this.city =
        this.formatSlug(city);

      this.locationServicePersistence.setCity(
        this.city
      );

      this.selectedLocation.set(
        this.toTitleCase(this.city)
      );
    };

    // Initial state
    updateCityFromUrl();

    // Update whenever navigation changes
    this.router.events
      .pipe(
        filter(
          event => event instanceof NavigationEnd
        ),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe(() => {

        updateCityFromUrl();

      });
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
            return of([]);
          }

          return this.locationService
            .search(query)
            .pipe(
              map(data =>
                Array.isArray(data)
                  ? data as LocationResult[]
                  : []
              ),
              catchError(() => of([]))
            );
        }),

        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe(results => {

        this.locationResults = results;

        this.locationLoading.set(false);
      });
  }


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

            this.restaurantLoading.set(false);

            this.restaurantResults = [];
            this.foodResults = [];
            this.cuisineResults = [];

            return;
          }

          this.restaurantLoading.set(true);
        }),

        filter(query => query.length >= 2),

        switchMap((query: string) => {

          const params = new HttpParams()
            .set('keyword', query);

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

        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe(results => {

        this.restaurantResults =
          results.data?.restaurants ?? [];

        this.foodResults =
          results.data?.foods ?? [];

        this.cuisineResults =
          results.data?.cuisines ?? [];

        this.restaurantLoading.set(false);
      });
  }


  toggleLocationDropdown(): void {
    this.showLocationDropdown =
      !this.showLocationDropdown;

    this.showRestaurantDropdown = false;
  }


  toggleRestaurantDropdown(): void {
    this.showRestaurantDropdown =
      !this.showRestaurantDropdown;

    this.showLocationDropdown = false;
  }

  private clearLocationSearch(): void {

    this.locationSearchSubject.next('');

    this.locationQuery = '';

    this.locationResults = [];

    this.locationLoading.set(false);
  }

  private clearRestaurantSearch(): void {

    this.restaurantSearchSubject.next('');

    this.restaurantQuery = '';

    this.restaurantResults = [];
    this.foodResults = [];
    this.cuisineResults = [];

    this.restaurantLoading.set(false);
  }


  closeDropdown(): void {

    this.showLocationDropdown = false;
    this.showRestaurantDropdown = false;

    this.clearLocationSearch();
    this.clearRestaurantSearch();
  }


  onLocationQueryChange(query: string): void {

    this.locationQuery = query;

    this.showLocationDropdown = true;

    this.locationSearchSubject.next(query);
  }


  onRestaurantQueryChange(
    query: string
  ): void {

    this.restaurantQuery = query;

    this.showRestaurantDropdown = true;

    this.restaurantSearchSubject.next(query);
  }


  selectLocation(item: LocationResult): void {

    const city = this.formatSlug(
      item.text
    );

    this.city = city;

    this.locationServicePersistence.setCity(
      city
    );

    this.selectedLocation.set(
      this.toTitleCase(city)
    );

    this.locationResults = [];
    this.locationQuery = '';
    this.showLocationDropdown = false;

    this.router.navigate(
      ['/india', city],
      {
        replaceUrl: true
      }
    );
  }


  detectLocation(): void {

    if (this.detectLocationLoader()) {
      return;
    }

    if (
      typeof navigator === 'undefined' ||
      !navigator.geolocation
    ) {
      return;
    }

    this.detectLocationLoader.set(true);

    navigator.geolocation.getCurrentPosition(
      position => {
        this.handleDetectedLocation(
          position.coords.latitude,
          position.coords.longitude
        );
      },
      () => {
        this.detectLocationLoader.set(false);
        this.showLocationDropdown = false;
      }
    );
  }


  private handleDetectedLocation(
    latitude: number,
    longitude: number
  ): void {

    this.locationService
      .reverseGeocode(latitude, longitude)
      .pipe(
        map(data => data as ReverseGeocodeResponse),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe({
        next: data => {

          const city =
            data?.context?.[2]?.text;

          const location =
            data?.context?.[1]?.text;

          if (!city) {
            this.detectLocationLoader.set(false);
            return;
          }

          this.locationServicePersistence.setLocation(
            latitude,
            longitude
          );

          this.locationServicePersistence.setCity(
            city
          );

          this.city =
            this.formatSlug(city);

          this.selectedLocation.set(
            location
              ? this.toTitleCase(location)
              : this.toTitleCase(city)
          );

          this.showLocationDropdown = false;

          this.router.navigate(
            ['/india', this.city],
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


  selectRestaurant(
    restaurant: RestaurantResult
  ): void {

    this.closeSearchDropdown();

    const restaurantSlug =
      this.formatSlug(restaurant.slug);

    this.router.navigate([
      '/india',
      this.city,
      'r',
      restaurantSlug
    ]);
  }


  selectCuisine(cuisine: string): void {

    this.closeSearchDropdown();

    this.router.navigate(
      ['/india', this.city],
      {
        queryParams: {
          cuisine
        }
      }
    );
  }


  selectFood(food: FoodResult): void {

    this.closeSearchDropdown();

    this.router.navigate(
      ['/india', this.city],
      {
        queryParams: {
          food: food.name
        }
      }
    );
  }


  goToProfile(user: string): void {
    this.router.navigate([
      '/users',
      user
    ]);
  }


  logout(): void {

    this.authService
      .logout()
      .pipe(
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe({
        next: () => {

          this.store.dispatch(
            AuthActions.logout()
          );

          this.router.navigate(
            ['/'],
            {
              replaceUrl: true
            }
          );
        }
      });
  }


  toTitleCase(value: string | null): string {

    if (!value) {
      return '';
    }

    return value
      .split(/\s+/)
      .filter(Boolean)
      .map(word =>
        word.charAt(0).toUpperCase() +
        word.slice(1).toLowerCase()
      )
      .join(' ');
  }


  formatSlug(value: string): string {

    return value
      .toLowerCase()
      .trim()
      .replace(/\s+/g, '-')
      .replace(/[^\w-]+/g, '');
  }


  private closeSearchDropdown(): void {
    this.showRestaurantDropdown = false;
    this.restaurantQuery = '';
  }
}