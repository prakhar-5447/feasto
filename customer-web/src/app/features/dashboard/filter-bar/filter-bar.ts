import { ChangeDetectionStrategy, Component, computed, output, input } from '@angular/core';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faClose, faFilter } from '@fortawesome/free-solid-svg-icons';

import { RestaurantFilters } from '../../../core/restaurant/models/restaurant-filter.model';

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
  readonly faClose = faClose;
  readonly faFilter = faFilter;

  readonly filters = input.required<RestaurantFilters>();

  readonly filterClicked = output<void>();

  readonly removeFilter = output<keyof RestaurantFilters>();


  readonly activeFilters = computed<ActiveFilter[]>(() => {

    const filters = this.filters();

    const result: ActiveFilter[] = [];

    if (filters.food) {
      result.push({
        key: 'food',
        label: filters.food
      });
    }

    if (filters.cuisine) {
      result.push({
        key: 'cuisine',
        label: filters.cuisine
      });
    }

    if (filters.rating) {
      result.push({
        key: 'rating',
        label: `${filters.rating}★ & above`
      });
    }

    if (filters.veg) {
      result.push({
        key: 'veg',
        label: 'Pure Veg'
      });
    }

    return result;
  });


  openFilters(): void {
    this.filterClicked.emit();
  }


  remove(key: keyof RestaurantFilters): void {
    this.removeFilter.emit(key);
  }
}