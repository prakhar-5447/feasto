import { Injectable } from '@angular/core';
import { RestaurantService } from '../../core/services/restaurent.service';
import { ActivatedRouteSnapshot } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class RestaurantResolver {
  constructor(private restaurantService: RestaurantService) { }

  resolve(route: ActivatedRouteSnapshot) {
    return this.restaurantService.restaurant;
  }
}