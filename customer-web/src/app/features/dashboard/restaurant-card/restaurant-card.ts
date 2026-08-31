import { ChangeDetectionStrategy, Component, input, Input } from '@angular/core';

import { RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { faStar, faTag } from '@fortawesome/free-solid-svg-icons';

import { faClock } from '@fortawesome/free-regular-svg-icons';

import { Restaurant } from '../../../core/restaurant/models/restaurant.model';


@Component({
  selector: 'app-restaurant-card',
  standalone: true,
  imports: [RouterLink, FontAwesomeModule],
  templateUrl: './restaurant-card.html',
  styleUrl: './restaurant-card.sass',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RestaurantCard {

  @Input({ required: true })
  restaurant!: Restaurant;

  readonly city = input('');

  readonly faTag = faTag;
  readonly faStar = faStar;
  readonly faClock = faClock;

}