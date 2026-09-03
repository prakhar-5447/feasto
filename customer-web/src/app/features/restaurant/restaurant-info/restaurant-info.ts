import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input
} from '@angular/core';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { Store } from '@ngrx/store';

import {
  faLocationDot,
  faStar,
  faExclamationCircle
} from '@fortawesome/free-solid-svg-icons';

import { faClock } from '@fortawesome/free-regular-svg-icons';

import {
  RestaurantDetail
} from '../../../core/restaurant/models/restaurant.model';

import { selectSelectedLocation } from '../../../store/location/location.selectors';
import { AppState } from '../../../store/app.state';

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
    input.required<RestaurantDetail | null>();

  readonly faClock = faClock;
  readonly faLocationDot = faLocationDot;
  readonly faExclamationCircle = faExclamationCircle;
  readonly faStar = faStar;
  private readonly store = inject(Store<AppState>);
  readonly selectedLocation =
    this.store.selectSignal(
      selectSelectedLocation
    );

  distance = 0;

  constructor(

  ) { }

  ngOnInit(): void {
    const location = this.selectedLocation();

    if (!location) {
      return;
    }

    if (location) {
      this.getDistance(
        location.latitude,
        location.longitude
      );
    }
  }

  isOpenNow(): boolean {
    const hours =
      this.restaurantInfo()?.hours;

    if (!hours) {
      return false;
    }

    const {
      open,
      close
    } = hours;

    const now =
      new Date().getHours();

    // Normal opening hours
    if (open <= close) {
      return now >= open && now < close;
    }

    // Overnight opening hours
    return now >= open || now < close;
  }

  private getDistance(
    userLat: number,
    userLng: number
  ): void {

    const coordinates =
      this.restaurantInfo()
        ?.location
        ?.coordinates;

    if (
      !coordinates ||
      coordinates.length < 2
    ) {
      return;
    }

    /*
     * GeoJSON coordinates:
     *
     * [longitude, latitude]
     */

    const restaurantLng =
      Number(coordinates[0]);

    const restaurantLat =
      Number(coordinates[1]);

    if (
      !Number.isFinite(restaurantLat) ||
      !Number.isFinite(restaurantLng)
    ) {
      return;
    }

    const earthRadiusKm = 6371;

    const dLat =
      this.toRad(
        restaurantLat - userLat
      );

    const dLng =
      this.toRad(
        restaurantLng - userLng
      );

    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos(
        this.toRad(userLat)
      ) *
      Math.cos(
        this.toRad(restaurantLat)
      ) *
      Math.sin(dLng / 2) ** 2;

    const c =
      2 *
      Math.atan2(
        Math.sqrt(a),
        Math.sqrt(1 - a)
      );

    const distanceKm =
      earthRadiusKm * c;

    this.distance =
      Number(distanceKm.toFixed(2));
  }

  private toRad(
    value: number
  ): number {
    return value * Math.PI / 180;
  }
}