import { ChangeDetectionStrategy, Component, input, Input } from '@angular/core';

import { RouterLink } from '@angular/router';

import { LucideBadgePercent, LucideClock, LucideStar } from '@lucide/angular';

import { Restaurant } from '@/app/features/dashboard/models/restaurant.model';


@Component({
  selector: 'app-restaurant-card',
  standalone: true,
  imports: [RouterLink, LucideStar, LucideBadgePercent, LucideClock],
  templateUrl: './restaurant-card.html',
  styleUrl: './restaurant-card.sass',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RestaurantCard {

  @Input({ required: true })
  restaurant!: Restaurant;

  readonly city = input('');

}