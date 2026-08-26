import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { DOCUMENT } from '@angular/common'

import { Store } from '@ngrx/store';

import { AppState } from '../../store/app.state';
import { selectSelectedLocation } from '../../store/location/location.selectors';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faUtensils } from '@fortawesome/free-solid-svg-icons';

import { AdsCarousel } from './ads-carousel/ads-carousel';
import { Categories } from './categories/categories';
import { RestaurantList } from './restaurant-list/restaurant-list';
import { ActivatedRoute, Router } from '@angular/router';

import { map } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';

import { FilterBar } from './filter-bar/filter-bar';

import { RestaurantFilters } from '../../core/restaurant/models/restaurant-filter.model';
import { FilterModal } from './filter-modal/filter-modal';
import { Modal } from '../../shared/components/modal/modal';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [FilterBar, Modal, FilterModal, AdsCarousel, Categories, RestaurantList, FontAwesomeModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.sass',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Dashboard {
  readonly faUtensils = faUtensils

  private readonly document = inject(DOCUMENT);

  private readonly store = inject(Store<AppState>);

  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  readonly showFilterModal = signal(false);

  readonly selectedLocation =
    this.store.selectSignal(
      selectSelectedLocation
    );

  selectedCategory: string | null = null;

  loading = true;

  ngOnInit(): void {

    const location =
      this.selectedLocation();

    if (!location) {
      return;
    }

    this.loadDashboard(location);
  }


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

          const food =
            params.get('food');

          const cuisine =
            params.get('cuisine');

          const rating =
            params.get('rating');

          const veg =
            params.get('veg');

          if (food) {
            filters.food = food;
          }

          if (cuisine) {
            filters.cuisine = cuisine;
          }

          if (rating) {
            filters.rating = Number(rating);
          }

          if (veg === 'true') {
            filters.veg = true;
          }

          return filters;
        })
      ),
      {
        initialValue: {}
      }
    );

  removeFilter(
    key: keyof RestaurantFilters
  ): void {

    this.router.navigate([], {
      queryParams: {
        [key]: null
      },
      queryParamsHandling: 'merge'
    });

  }

  applyFilters(
    filters: RestaurantFilters
  ): void {

    this.router.navigate([], {
      queryParams: {
        food: filters.food || null,
        cuisine: filters.cuisine || null,
        rating: filters.rating || null,
        veg: filters.veg || null
      },
      queryParamsHandling: 'merge'
    });

    this.closeFilters();

  }

  private loadDashboard(location: NonNullable<ReturnType<typeof this.selectedLocation>>): void {

    // console.log(
    //   'Loading dashboard for:',
    //   location.city,
    //   location.latitude,
    //   location.longitude
    // );

    // Temporary until restaurant API exists
    setTimeout(() => {
      this.loading = false;
    }, 1500);
  }

  onCategorySelect(
    category: string | null
  ): void {

    this.selectedCategory =
      category;
  }
}