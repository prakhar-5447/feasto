import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';

import { DietaryOption, PriceRange, RestaurantFilters, SortOption } from '../../../core/restaurant/models/filter.model';
import { Button } from '../../../shared/components/button/button';
import { RESTAURANT_FILTER_OPTIONS } from '../../../core/restaurant/data/filter-options';
import { Category } from '../../../core/restaurant/models/category.model';


@Component({
  selector: 'app-filter-modal',
  standalone: true,
  imports: [Button, FontAwesomeModule],
  templateUrl: './filter-modal.html',
  styleUrl: './filter-modal.sass',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FilterModal implements OnChanges {
  faClose = faClose;

  @Input()
  filters: RestaurantFilters = {};


  @Output()
  close = new EventEmitter<void>();


  @Output()
  applyFilters = new EventEmitter<RestaurantFilters>();

  draftFilters: RestaurantFilters = {};

  readonly cuisines = RESTAURANT_FILTER_OPTIONS.cuisines;

  readonly restaurants = RESTAURANT_FILTER_OPTIONS.restaurants;

  readonly collections = RESTAURANT_FILTER_OPTIONS.collections;

  readonly ratings = RESTAURANT_FILTER_OPTIONS.ratings;

  readonly priceRanges = RESTAURANT_FILTER_OPTIONS.priceRanges;

  readonly deliveryTimes = RESTAURANT_FILTER_OPTIONS.deliveryTimes;

  readonly distances = RESTAURANT_FILTER_OPTIONS.distances;

  readonly sortOptions = RESTAURANT_FILTER_OPTIONS.sortOptions;


  ngOnChanges(
    changes: SimpleChanges
  ): void {

    if (changes['filters']) {

      this.draftFilters = {
        ...this.filters
      };

    }

  }


  selectCategory(category: Category): void {

    if (category.type === 'food') {

      // Clicking the already selected food → deselect
      if (this.draftFilters.food === category.id) {

        this.draftFilters = {
          ...this.draftFilters,
          food: undefined
        };

        return;
      }

      // Select new food.
      // Existing cuisine remains untouched.
      this.draftFilters = {
        ...this.draftFilters,
        food: category.id
      };

      return;
    }


    if (category.type === 'cuisine') {

      // Clicking the already selected cuisine → deselect
      if (this.draftFilters.cuisine === category.id) {

        this.draftFilters = {
          ...this.draftFilters,
          cuisine: undefined
        };

        return;
      }

      // Select new cuisine.
      // Existing food remains untouched.
      this.draftFilters = {
        ...this.draftFilters,
        cuisine: category.id
      };
    }
  }

  selectRating(rating: number): void {

    this.draftFilters = {
      ...this.draftFilters,
      rating
    };

  }

  selectPrice(price: PriceRange): void {

    if (this.draftFilters.price === price) {
      delete this.draftFilters.price;
    } else {
      this.draftFilters.price = price;
    }
  }

  selectRestaurant(restaurant: string): void {

    if (this.draftFilters.restaurant === restaurant) {
      delete this.draftFilters.restaurant;
    } else {
      this.draftFilters.restaurant = restaurant;
    }
  }

  selectCollection(collection: string): void {

    if (this.draftFilters.collection === collection) {
      delete this.draftFilters.collection;
    } else {
      this.draftFilters.collection = collection;
    }
  }

  setDietary(dietary: DietaryOption): void {

    const isSelected = this.draftFilters[dietary] === true;

    this.draftFilters.veg = undefined;
    this.draftFilters.nonVeg = undefined;
    this.draftFilters.egg = undefined;
    this.draftFilters.vegan = undefined;
    this.draftFilters.halal = undefined;

    if (!isSelected) {
      this.draftFilters[dietary] = true;
    }
  }

  toggleOffers(): void {

    if (this.draftFilters.offers === true) {
      delete this.draftFilters.offers;
    } else {
      this.draftFilters.offers = true;
    }
  }

  toggleOpenNow(): void {

    if (this.draftFilters.openNow === true) {
      delete this.draftFilters.openNow;
    } else {
      this.draftFilters.openNow = true;
    }
  }

  selectDistance(distance: number): void {

    if (this.draftFilters.maxDistance === distance) {
      delete this.draftFilters.maxDistance;
    } else {
      this.draftFilters.maxDistance = distance;
    }
  }

  selectDeliveryTime(time: number): void {

    if (this.draftFilters.maxDeliveryTime === time) {
      delete this.draftFilters.maxDeliveryTime;
    } else {
      this.draftFilters.maxDeliveryTime = time;
    }
  }

  selectSort(sort: SortOption): void {

    if (this.draftFilters.sort === sort) {
      delete this.draftFilters.sort;
    } else {
      this.draftFilters.sort = sort;
    }
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