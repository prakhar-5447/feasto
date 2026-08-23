import { ChangeDetectorRef, Component, Input } from '@angular/core';

import {
  faLocationDot, faStar, faExclamationCircle
} from '@fortawesome/free-solid-svg-icons';
import {
  faClock,
} from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RestaurantService } from '../../../core/services/restaurant.service';
import { LocationService, LocationServicePersistence } from '../../../core/services/location.service';
@Component({
  selector: 'app-restaurant-info',
  imports: [FontAwesomeModule],
  templateUrl: './restaurant-info.html',
  styleUrl: './restaurant-info.sass',
})
export class RestaurantInfo {
  faClock = faClock;
  faLocationDot = faLocationDot;
  faExclamationCircle = faExclamationCircle;
  faStar = faStar;
  distance = "0 km";

  constructor(
    public restaurantService: RestaurantService,
    private locationServicePersistence: LocationServicePersistence,
    private cdr: ChangeDetectorRef
  ) {
  }

  ngOnInit() {
    const location =
      this.locationServicePersistence.getLocation();

    if (
      location &&
      this.restaurantService.restaurant?.location &&
      this.distance === '0 km'
    ) {
      this.getDistance(
        location.lat,
        location.lng
      );
    }
  }

  isOpenNow() {
    const now = new Date().getHours();
    const open = this.restaurantService.restaurant?.openTime
    const close = this.restaurantService.restaurant?.closeTime
    return now >= open && now < close;
  }


  getDistance(userLat: number, userLng: number): void {
    const restaurantLat =
      this.restaurantService.restaurant.location.coordinates[1];

    const restaurantLng =
      this.restaurantService.restaurant.location.coordinates[0];

    const R = 6371;

    const dLat = this.toRad(restaurantLat - userLat);
    const dLng = this.toRad(restaurantLng - userLng);

    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos(this.toRad(userLat)) *
      Math.cos(this.toRad(restaurantLat)) *
      Math.sin(dLng / 2) ** 2;

    const c = 2 * Math.atan2(
      Math.sqrt(a),
      Math.sqrt(1 - a)
    );

    this.distance = (R * c).toFixed(1) + ' km';
    this.cdr.detectChanges();
  }

  private toRad(value: number): number {
    return value * Math.PI / 180;
  }
}
