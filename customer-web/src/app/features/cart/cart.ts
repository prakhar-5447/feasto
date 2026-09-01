import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  signal
} from '@angular/core';

import { Router } from '@angular/router';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import {
  faMinus,
  faPlus,
  faTag
} from '@fortawesome/free-solid-svg-icons';

import { faTrashCan } from '@fortawesome/free-regular-svg-icons';

import {
  takeUntilDestroyed
} from '@angular/core/rxjs-interop';

import { CartService } from '../../core/services/cart.service';
import { LocationServicePersistence } from '../../core/services/location.service';
import { RestaurantService } from '../../core/services/restaurant.service';

import { Button } from '../../shared/components/button/button';
import { Coupons } from './coupons/coupons';


interface CartItem {
  food: {
    _id: string;
    name: string;
    image: string;
    price: number;
  };
  name: string;
  price: number;
  quantity: number;
}


interface Coupon {
  code: string;
  description: string;
}


interface CartSummary {
  itemTotal: number;
  discount: number;
  deliveryFee: number;
  platformFee: number;
  gst: number;
  gstRate: number;
  grandTotal: number;
  itemCount?: number;
  restaurant?: {
    _id: string;
    name: string;
    slug: string;
  };
  coupon?: Coupon;
}


interface CartResponse {
  data?: {
    items?: CartItem[];
  };
}


interface CartSummaryResponse {
  data: CartSummary;
}


@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [
    FontAwesomeModule,
    Button,
    Coupons
  ],
  templateUrl: './cart.html',
  styleUrl: './cart.sass',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Cart {

  readonly faTrashCan = faTrashCan;
  readonly faMinus = faMinus;
  readonly faPlus = faPlus;
  readonly faTag = faTag;

  readonly cart = signal<CartItem[]>([]);

  readonly summary = signal<CartSummary>({
    itemTotal: 0,
    discount: 0,
    deliveryFee: 0,
    platformFee: 0,
    gst: 0,
    gstRate: 0.05,
    grandTotal: 0,
    itemCount: 0
  });

  readonly loading = signal(true);

  readonly updatingItemId =
    signal<string | null>(null);

  readonly removingItemId =
    signal<string | null>(null);

  private readonly cartService =
    inject(CartService);

  private readonly restaurantService =
    inject(RestaurantService);

  private readonly locationService =
    inject(LocationServicePersistence);

  private readonly router =
    inject(Router);

  private readonly destroyRef =
    inject(DestroyRef);


  ngOnInit(): void {
    this.loadCart();
  }


  private loadCart(): void {

    this.loading.set(true);

    this.cartService
      .getCart()
      .pipe(
        takeUntilDestroyed(
          this.destroyRef
        )
      )
      .subscribe({
        next: (response: any) => {

          this.cart.set(
            response.data?.items ?? []
          );

          this.loadSummary();
        },

        error: error => {

          console.error(
            'Load cart error:',
            error
          );

          this.cart.set([]);
          this.loading.set(false);
        }
      });
  }


  private loadSummary(): void {

    this.cartService
      .getCartSummary()
      .pipe(
        takeUntilDestroyed(
          this.destroyRef
        )
      )
      .subscribe({
        next: (response: any) => {

          this.summary.set(
            response.data
          );

          this.loading.set(false);
        },

        error: error => {

          console.error(
            'Load cart summary error:',
            error
          );

          this.loading.set(false);
        }
      });
  }


  get restaurantName(): string {
    return this.summary()
      .restaurant?.name ?? '';
  }


  get itemTotal(): number {
    return this.summary()
      .itemTotal;
  }


  get discount(): number {
    return this.summary()
      .discount;
  }


  get deliveryFee(): number {
    return this.summary()
      .deliveryFee;
  }


  get platformFee(): number {
    return this.summary()
      .platformFee;
  }


  get gst(): number {
    return this.summary()
      .gst;
  }


  get gstRate(): number {
    return this.summary()
      .gstRate;
  }


  get finalTotal(): number {
    return this.summary()
      .grandTotal;
  }


  get appliedCoupon(): Coupon | null {
    return this.summary()
      .coupon ?? null;
  }


  get itemCount(): number {
    return this.summary()
      .itemCount ?? 0;
  }


  updateQuantity(
    foodId: string,
    quantity: number
  ): void {

    if (quantity < 1) {
      this.removeItem(foodId);
      return;
    }

    if (
      this.updatingItemId() ||
      this.removingItemId()
    ) {
      return;
    }

    this.updatingItemId.set(foodId);

    this.cartService
      .updateQuantity(
        foodId,
        quantity
      )
      .pipe(
        takeUntilDestroyed(
          this.destroyRef
        )
      )
      .subscribe({
        next: () => {
          this.loadCart();
        },

        error: error => {

          console.error(
            'Update quantity error:',
            error
          );

          this.updatingItemId.set(null);
        },

        complete: () => {
          this.updatingItemId.set(null);
        }
      });
  }


  removeItem(foodId: string): void {

    if (
      this.removingItemId() ||
      this.updatingItemId()
    ) {
      return;
    }

    this.removingItemId.set(foodId);

    this.cartService
      .removeFromCart(foodId)
      .pipe(
        takeUntilDestroyed(
          this.destroyRef
        )
      )
      .subscribe({
        next: () => {
          this.loadCart();
        },

        error: error => {

          console.error(
            'Remove item error:',
            error
          );

          this.removingItemId.set(null);
        },

        complete: () => {
          this.removingItemId.set(null);
        }
      });
  }


  clearCart(): void {

    this.cartService
      .clearCart()
      .pipe(
        takeUntilDestroyed(
          this.destroyRef
        )
      )
      .subscribe({
        next: () => {
          this.loadCart();
        },

        error: error => {

          console.error(
            'Clear cart error:',
            error
          );
        }
      });
  }


  browseRestaurants(): void {

    const city =
      this.locationService.getCity();

    this.router.navigate(
      ['/india'],
      {
        queryParams: city
          ? { city }
          : {}
      }
    );
  }


  checkout(): void {

    const restaurant =
      this.summary().restaurant ??
      this.restaurantService.restaurant;

    if (!restaurant) {
      return;
    }

    const city =
      this.locationService.getCity();

    this.router.navigate(
      [
        '/india',
        'r',
        restaurant.slug,
        'checkout'
      ],
      {
        queryParams: city
          ? { city }
          : {}
      }
    );
  }
}