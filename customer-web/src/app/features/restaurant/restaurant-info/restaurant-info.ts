import { Component, Input } from '@angular/core';
import {
  faLocationDot, faStar, faExclamationCircle
} from '@fortawesome/free-solid-svg-icons';
import {
  faClock,
} from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RestaurantService } from '../../../core/services/restaurent.service';
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

  constructor(public restaurantService: RestaurantService
  ) {
  }
  isOpenNow() {
    const now = new Date().getHours();
    const open = this.restaurantService.restaurant?.openTime
    const close = this.restaurantService.restaurant?.closeTime
    return now >= open && now < close;
  }
}
