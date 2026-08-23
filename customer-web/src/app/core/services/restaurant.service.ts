import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {

  restaurant: any = null;
  menu: any = null;
  reviews: any = null;

  constructor() { }
}