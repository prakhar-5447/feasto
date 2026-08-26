import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';

import { RestaurantFilters } from '../../../core/restaurant/models/restaurant-filter.model';


@Component({
  selector: 'app-filter-modal',
  standalone: true,
  templateUrl: './filter-modal.html',
  styleUrl: './filter-modal.sass',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FilterModal implements OnChanges {

  @Input()
  filters: RestaurantFilters = {};


  @Output()
  close = new EventEmitter<void>();


  @Output()
  applyFilters =
    new EventEmitter<RestaurantFilters>();


  draftFilters: RestaurantFilters = {};


  readonly cuisines = [
    'North Indian',
    'South Indian',
    'Chinese',
    'Italian',
    'Fast Food',
    'Biryani',
    'Pizza'
  ];


  readonly ratings = [
    4,
    3,
    2
  ];


  ngOnChanges(
    changes: SimpleChanges
  ): void {

    if (changes['filters']) {

      this.draftFilters = {
        ...this.filters
      };

    }

  }


  selectCuisine(
    cuisine: string
  ): void {

    this.draftFilters = {
      ...this.draftFilters,
      cuisine
    };

  }


  selectRating(
    rating: number
  ): void {

    this.draftFilters = {
      ...this.draftFilters,
      rating
    };

  }


  setVeg(
    value: boolean
  ): void {

    this.draftFilters = {
      ...this.draftFilters,
      veg: value
    };

  }


  clearFilters(): void {

    this.draftFilters = {};

  }


  apply(): void {

    this.applyFilters.emit({
      ...this.draftFilters
    });

  }

}