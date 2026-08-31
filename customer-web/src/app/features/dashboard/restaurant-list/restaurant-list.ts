import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';

import { RestaurantCard } from '../restaurant-card/restaurant-card';

import { Restaurant } from '../../../core/restaurant/models/restaurant.model';
import { RestaurantFilters } from '../../../core/restaurant/models/filter.model';

import { LabelPipe } from '../../../shared/pipes/label.pipe';


@Component({
  selector: 'app-restaurant-list',
  standalone: true,
  imports: [RestaurantCard,],
  templateUrl: './restaurant-list.html',
  styleUrl: './restaurant-list.sass',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RestaurantList {

  private readonly labelPipe = inject(LabelPipe);

  readonly restaurants = input<Restaurant[]>([]);
  readonly city = input('');
  readonly area = input('');
  readonly filters = input<RestaurantFilters>({});


  readonly heading = computed(() => {

    const filters = this.filters();
    const city = this.city();

    if (filters.cuisine) {
      return `Top ${this.labelPipe.transform(filters.cuisine)} Restaurants Near You`;
    }

    if (filters.food) {
      return `Best ${this.labelPipe.transform(filters.food)} Near You`;
    }

    if (city) {
      return `Top Restaurants in ${this.labelPipe.transform(city)}`;
    }

    return 'Top Restaurants Near You';
  });
}