import {
  ChangeDetectionStrategy,
  Component,
  input
} from '@angular/core';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import {
  faLocationDot,
  faStar,
  faExclamationCircle
} from '@fortawesome/free-solid-svg-icons';

import { faClock } from '@fortawesome/free-regular-svg-icons';

import { LocationServicePersistence }
  from '../../../core/services/location.service';

import { RestaurantInfoData }
  from '../../../core/restaurant/models/restaurant.model';


@Component({
  selector: 'app-restaurant-info',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './restaurant-info.html',
  styleUrl: './restaurant-info.sass',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RestaurantInfo {

  readonly restaurantInfo =
    input.required<RestaurantInfoData>();


  readonly faClock = faClock;
  readonly faLocationDot = faLocationDot;
  readonly faExclamationCircle = faExclamationCircle;
  readonly faStar = faStar;


  distance = '0 km';


  constructor(
    private readonly locationServicePersistence:
      LocationServicePersistence
  ) { }


  ngOnInit(): void {
    console.log(this.restaurantInfo())
    const location =
      this.locationServicePersistence.getLocation();

    if (location) {

      this.getDistance(
        location.lat,
        location.lng
      );

    }
  }


  isOpenNow(): boolean {
    const { openTime, closeTime } = this.restaurantInfo();

    if (openTime === undefined || closeTime === undefined) {
      return false;
    }

    const now = new Date().getHours();

    return now >= openTime && now < closeTime;
  }

  private getDistance(
    userLat: number,
    userLng: number
  ): void {

    const coordinates =
      this.restaurantInfo().location?.coordinates;

    if (!coordinates) {
      return;
    }

    const restaurantLat = coordinates[1];
    const restaurantLng = coordinates[0];

    const R = 6371;

    const dLat =
      this.toRad(restaurantLat - userLat);

    const dLng =
      this.toRad(restaurantLng - userLng);

    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos(this.toRad(userLat)) *
      Math.cos(this.toRad(restaurantLat)) *
      Math.sin(dLng / 2) ** 2;

    const c =
      2 * Math.atan2(
        Math.sqrt(a),
        Math.sqrt(1 - a)
      );

    this.distance =
      `${(R * c).toFixed(1)} km`;
  }


  private toRad(value: number): number {

    return value * Math.PI / 180;

  }

}