import { ChangeDetectorRef, Component } from '@angular/core';
import { Router } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faTrashCan } from '@fortawesome/free-regular-svg-icons';
import {
  faMinus,
  faPlus,
  faTag
} from '@fortawesome/free-solid-svg-icons';

import { CartService } from '../../core/services/cart.service';
import { RestaurantService } from '../../core/services/restaurent.service';
import { LocationServicePersistence } from '../../core/services/location.service';
import { Coupons } from './coupons/coupons';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [
    FontAwesomeModule,
    Coupons
  ],
  templateUrl: './cart.html',
  styleUrl: './cart.sass',
})
export class Cart {

  faTrashCan = faTrashCan;
  faMinus = faMinus;
  faPlus = faPlus;
  faTag = faTag;

  constructor(
    public cartService: CartService,
    private cdr: ChangeDetectorRef,
    public restaurantService: RestaurantService,
    public locationService: LocationServicePersistence,
    private router: Router
  ) { }

  cart: any[] = [];
  summary: any = {
    itemTotal: 0,
    discount: 0,
    deliveryFee: 0,
    platformFee: 0,
    gst: 0,
    grandTotal: 0
  };

  ngOnInit() {
    this.loadCart();
  }

  loadCart() {
    this.cartService.getCart().subscribe({
      next: (res: any) => {
        this.cart = [...(res.data?.items || [])];
        this.loadSummary();
      }
    });
  }

  loadSummary() {
    this.cartService.getCartSummary().subscribe({
      next: (res: any) => {
        this.summary = res.data;
        this.cdr.detectChanges()
      }
    });
  }

  get restaurantName() {
    return this.summary?.restaurant?.name || '';
  }

  get itemTotal() {
    return this.summary?.itemTotal || 0;
  }

  get discount() {
    return this.summary?.discount || 0;
  }

  get deliveryFee() {
    return this.summary?.deliveryFee || 0;
  }

  get platformFee() {
    return this.summary?.platformFee || 0;
  }

  get gst() {
    return this.summary?.gst || 0;
  }

  get gstRate() {
    return this.summary?.gstRate || 0.05;
  }

  get finalTotal() {
    return this.summary?.grandTotal || 0;
  }

  get appliedCoupon() {
    return this.summary?.coupon || null;
  }

  get itemCount() {
    return this.summary?.itemCount || 0;
  }

  updateQuantity(foodId: string, quantity: number) {
    this.cartService.updateQuantity(foodId, quantity)
      .subscribe(() => {
        this.loadCart();
      });
  }

  removeItem(foodId: string) {
    this.cartService.removeFromCart(foodId)
      .subscribe(() => {
        this.loadCart();
      });
  }

  clearCart() {

    this.cartService
      .clearCart()
      .subscribe({
        next: () => {
          this.loadCart();
        },
        error: (err) => {
          console.error(
            'Clear cart error:',
            err
          );
        }
      });
  }

  goBack() {
    this.router.navigate(['/india']);
  }

  checkout() {
    this.router.navigate([
      '/india',
      this.locationService.getCity(),
      this.restaurantService.restaurant.slug,
      'checkout'
    ]);
  }
}