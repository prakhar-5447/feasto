import { Component } from '@angular/core';
import { CartService } from '../../core/services/cart.service';
import { RestaurantService } from '../../core/services/restaurent.service';
import { Router } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faTrashCan
} from '@fortawesome/free-regular-svg-icons';
import {
  faMinus, faPlus, faTag
} from '@fortawesome/free-solid-svg-icons';
import { Coupons } from './coupons/coupons';
import { LocationServicePersistence } from '../../core/services/location.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [FontAwesomeModule, Coupons],
  templateUrl: './cart.html',
  styleUrl: './cart.sass',
})
export class Cart {
  faTrashCan = faTrashCan
  deliveryFee = 40;
  platformFee = 5;
  faMinus = faMinus
  faPlus = faPlus
  faTag = faTag
  gstPrecentage = 0.05

  constructor(
    public cartService: CartService,
    public restaurantService: RestaurantService,
    public locationService: LocationServicePersistence,
    private router: Router
  ) { }

  get cart() {
    return this.restaurantService.cart;
  }

  getTotal() {
    return this.cartService.getTotal();
  }

  getDiscount() {
    return this.cartService.getDiscount(); // implement in service
  }

  getItemCount() {
    return this.cartService.getItemCount();
  }
  // 🔥 Replace existing getters
  get itemTotal() {
    return this.getTotal();
  }

  get discount() {
    return this.getDiscount();
  }

  get gst() {
    return Math.round((this.itemTotal - this.discount) * this.gstPrecentage);
  }

  get finalTotal() {
    return this.itemTotal + this.deliveryFee + this.platformFee + this.gst - this.discount;
  }

  updateQuantity(itemId: string, qty: number) {
    this.cartService.updateQuantity(itemId, qty);
  }

  removeItem(itemId: string) {
    this.cartService.removeFromCart(itemId);
  }

  goBack() {
    this.router.navigate(['/india']);
  }
 formatSlug(name: string) {
    return name.
      toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^\w-]+/g, '')
  }
  checkout() {
    this.router.navigate(['/india', this.locationService.getCity(), this.formatSlug(this.restaurantService.restaurant.name), 'checkout'
    ]);
  }
}
