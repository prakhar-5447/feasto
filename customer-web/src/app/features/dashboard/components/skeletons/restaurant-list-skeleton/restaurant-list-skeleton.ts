import { Component } from '@angular/core';

@Component({
  selector: 'app-restaurant-list-skeleton',
  imports: [],
  templateUrl: './restaurant-list-skeleton.html',
  styleUrl: './restaurant-list-skeleton.sass',
})
export class RestaurantListSkeleton {
  readonly skeletonItems = Array.from({ length: 8 });
}
