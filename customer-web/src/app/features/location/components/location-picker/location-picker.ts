import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  signal,
} from '@angular/core';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faLocationCrosshairs,
  faLocationDot,
} from '@fortawesome/free-solid-svg-icons';

import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import {
  debounceTime,
  distinctUntilChanged,
  map,
  of,
  Subject,
  switchMap,
  catchError,
} from 'rxjs';

import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { Store } from '@ngrx/store';

import { AppState } from '@/app/store/app.state';
import * as LocationActions from '@/app/store/location/location.actions';
import { selectSelectedLocation } from '@/app/store/location/location.selectors';

import {
  LocationSearchResult,
  ReverseGeocodeResult,
} from '@/app/features/location/models/location-api.model';

import { SelectedLocation } from '@/app/features/location/models/location.model';

import { LocationService } from '@/app/features/location/services/location.service';

import { Loader } from '@/app/shared/components/loader/loader';
import { ClickOutsideDirective } from '@/app/shared/directive/clickOutside.directive';
import { SlugPipe } from '@/app/shared/pipes/slug.pipe';

@Component({
  selector: 'app-location-picker',
  standalone: true,
  imports: [
    FormsModule,
    FontAwesomeModule,
    ClickOutsideDirective,
    Loader,
  ],
  templateUrl: './location-picker.html',
  styleUrl: './location-picker.sass',
  host: {
    class: 'location-picker-host',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LocationPicker {
  readonly faLocationDot = faLocationDot;
  readonly faLocationCrosshairs = faLocationCrosshairs;

  readonly locationLoading = signal(false);
  readonly detectLocationLoader = signal(false);

  locationQuery = '';
  locationResults: LocationSearchResult[] = [];

  showDropdown = false;
  private readonly store = inject(Store<AppState>);
  private readonly router = inject(Router);
  private readonly slugPipe = inject(SlugPipe);
  private readonly locationService = inject(LocationService);

  readonly selectedLocation = this.store.selectSignal(
    selectSelectedLocation
  );

  private readonly locationSearchSubject =
    new Subject<string>();

  private readonly destroyRef = inject(DestroyRef);

  constructor() {
    this.initializeLocationSearch();
  }

  private initializeLocationSearch(): void {
    this.locationSearchSubject
      .pipe(
        map(query => query.trim()),
        debounceTime(300),
        distinctUntilChanged(),

        switchMap(query => {
          if (!query) {
            this.locationLoading.set(false);
            this.locationResults = [];

            return of([] as LocationSearchResult[]);
          }

          this.locationLoading.set(true);

          return this.locationService.search(query).pipe(
            map(results =>
              Array.isArray(results)
                ? results
                : []
            ),
            catchError(() =>
              of([] as LocationSearchResult[])
            )
          );
        }),

        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe(results => {
        this.locationResults = results;
        this.locationLoading.set(false);
      });
  }

  onQueryChange(query: string): void {
    this.locationQuery = query;
    this.showDropdown = true;

    this.locationSearchSubject.next(query);
  }

  toggleDropdown(): void {
    this.showDropdown = !this.showDropdown;
  }

  detectLocation(): void {
    if (!navigator.geolocation) {
      return;
    }

    this.detectLocationLoader.set(true);

    navigator.geolocation.getCurrentPosition(
      position => {
        const { latitude, longitude } = position.coords;

        this.handleDetectedLocation(
          latitude,
          longitude
        );
      },
      () => {
        this.detectLocationLoader.set(false);
      }
    );
  }

  private handleDetectedLocation(
    latitude: number,
    longitude: number
  ): void {
    this.locationService
      .reverseGeocode(latitude, longitude)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (data: ReverseGeocodeResult) => {
          const city = data.context?.[2]?.text;

          if (!city) {
            this.detectLocationLoader.set(false);
            return;
          }

          const slug = this.slugPipe.transform(city);

          const location: SelectedLocation = {
            city,
            slug,
            latitude,
            longitude,
            source: 'gps',
          };

          this.store.dispatch(
            LocationActions.selectLocation({
              location,
            })
          );

          this.clearSearch();

          this.router.navigate(
            ['/india', slug],
            { replaceUrl: true }
          );

          this.detectLocationLoader.set(false);
        },

        error: () => {
          this.detectLocationLoader.set(false);
          this.showDropdown = false;
        },
      });
  }

  selectLocation(
    item: LocationSearchResult
  ): void {
    const slug = this.slugPipe.transform(item.text);

    const [longitude, latitude] = item.center;

    const location: SelectedLocation = {
      city: item.text,
      slug,
      latitude,
      longitude,
      source: 'search',
    };

    this.store.dispatch(
      LocationActions.selectLocation({
        location,
      })
    );

    this.clearSearch();

    this.router.navigate(
      ['/india', slug],
      { replaceUrl: true }
    );
  }

  closeDropdown(): void {
    this.showDropdown = false;
    this.clearSearch();
  }

  private clearSearch(): void {
    this.locationSearchSubject.next('');

    this.locationQuery = '';
    this.locationResults = [];
    this.locationLoading.set(false);
  }
}