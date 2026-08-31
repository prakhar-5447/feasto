import { ChangeDetectionStrategy, Component, computed, output, input, Output, signal, inject } from '@angular/core';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCheck, faChevronDown, faClose, faFilter, } from '@fortawesome/free-solid-svg-icons';

import { RestaurantFilters, SortOption } from '../../../core/restaurant/models/filter.model';
import { RESTAURANT_FILTER_OPTIONS } from '../../../core/restaurant/data/filter-options';
import { LabelPipe } from '../../../shared/pipes/label.pipe';

interface ActiveFilter {
  key: keyof RestaurantFilters;
  label: string;
}


@Component({
  selector: 'app-filter-bar',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './filter-bar.html',
  styleUrl: './filter-bar.sass',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FilterBar {
  readonly faCheck = faCheck;
  readonly faClose = faClose;
  readonly faFilter = faFilter;
  readonly faChevronDown = faChevronDown;

  private readonly labelPipe = inject(LabelPipe);

  readonly filters = input.required<RestaurantFilters>();

  readonly filterClicked = output<void>();

  readonly removeFilter = output<keyof RestaurantFilters>();

  readonly isVegSelected = computed(() =>
    this.filters().veg === true
  );

  readonly currentSort = computed(() =>
    this.filters().sort ?? 'relevance'
  );

  readonly currentSortLabel = computed(() => {
    const value = this.currentSort();

    return this.sortOptions.find(
      option => option.value === value
    )?.label ?? 'Relevance';
  });

  readonly vegChanged = output<boolean>();

  readonly sortChanged = output<SortOption | null>();
  readonly sortOptions = RESTAURANT_FILTER_OPTIONS.sortOptions;
  readonly showSortDropdown = signal(false);

  toggleVeg(): void {
    this.vegChanged.emit(
      !this.isVegSelected()
    );
  }

  toggleSortDropdown(): void {
    this.showSortDropdown.update(
      value => !value
    );
  }

  selectSort(
    value: SortOption
  ): void {

    this.showSortDropdown.set(false);

    this.sortChanged.emit(value);
  }

  readonly activeFilters = computed(() => {

    const filters = this.filters();

    const active: ActiveFilter[] = [];

    if (filters.food) {
      active.push({
        key: 'food' as const,
        label: this.labelPipe.transform(filters.food)
      });
    }

    if (filters.cuisine) {
      active.push({
        key: 'cuisine' as const,
        label: this.labelPipe.transform(filters.cuisine)
      });
    }

    if (filters.restaurant) {
      active.push({
        key: 'restaurant' as const,
        label: filters.restaurant
      });
    }

    if (filters.collection) {
      active.push({
        key: 'collection' as const,
        label: this.labelPipe.transform(filters.collection)
      });
    }

    // Dietary
    // veg is handled by the dedicated Pure Veg button.

    if (filters.nonVeg) {
      active.push({
        key: 'nonVeg' as const,
        label: 'Non-Veg'
      });
    }

    if (filters.vegan) {
      active.push({
        key: 'vegan' as const,
        label: 'Vegan'
      });
    }

    if (filters.halal) {
      active.push({
        key: 'halal' as const,
        label: 'Halal'
      });
    }

    if (filters.rating) {
      active.push({
        key: 'rating' as const,
        label: `${filters.rating}★ & above`
      });
    }

    if (filters.price) {
      active.push({
        key: 'price' as const,
        label: `Price: ${this.labelPipe.transform(filters.price)}`
      });
    }

    if (filters.maxDeliveryTime) {
      active.push({
        key: 'maxDeliveryTime' as const,
        label: `Under ${filters.maxDeliveryTime} min`
      });
    }

    if (filters.maxDistance) {
      active.push({
        key: 'maxDistance' as const,
        label: `Within ${filters.maxDistance} km`
      });
    }

    if (filters.offers) {
      active.push({
        key: 'offers' as const,
        label: 'Offers'
      });
    }

    if (filters.openNow) {
      active.push({
        key: 'openNow' as const,
        label: 'Open Now'
      });
    }

    return active;
  });


  openFilters(): void {
    this.filterClicked.emit();
  }


  remove(key: keyof RestaurantFilters): void {
    this.removeFilter.emit(key);
  }
}