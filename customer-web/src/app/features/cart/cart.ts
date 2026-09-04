import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject
} from '@angular/core';

import {
  ActivatedRoute,
  Router
} from '@angular/router';
import { Store } from '@ngrx/store';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faMinus,
  faPlus,
  faTag
} from '@fortawesome/free-solid-svg-icons';

import { faTrashCan } from '@fortawesome/free-regular-svg-icons';

import { Button } from '../../shared/components/button/button';
import { Coupons } from './coupons/coupons';

import * as CartActions from '../../store/cart/cart.actions';

import {
  selectCartItems,
  selectCartSummary,
  selectCartRestaurant,
  selectCartCount,
  selectUpdatingItemIds,
  selectRemovingItemIds,
  selectCartStatus
} from '../../store/cart/cart.selectors';

import { AppState } from '../../store/app.state';

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


  private readonly store =
    inject(Store<AppState>);

  private readonly router =
    inject(Router);

  private readonly route =
    inject(ActivatedRoute);


  // --------------------------------
  // CART STATE
  // --------------------------------

  readonly cart =
    this.store.selectSignal(
      selectCartItems
    );

  readonly summary =
    this.store.selectSignal(
      selectCartSummary
    );

  readonly restaurant =
    this.store.selectSignal(
      selectCartRestaurant
    );

  // Cart UI state
  readonly cartStatus = this.store.selectSignal(selectCartStatus);
  readonly itemCount = this.store.selectSignal(selectCartCount);

  readonly updatingItemIds =
    this.store.selectSignal(selectUpdatingItemIds);

  readonly removingItemIds =
    this.store.selectSignal(selectRemovingItemIds);

  readonly loading = computed(
    () => this.cartStatus() === 'idle' ||
      this.cartStatus() === 'loading'
  );

  private readonly cartRedirectEffect = effect(() => {

    const status = this.cartStatus();
    const items = this.cart();

    if (status !== 'success') {
      return;
    }

    if (items.length === 0) {
      this.router.navigate(['../'], {
        relativeTo: this.route
      });
    }

  });

  increaseQuantity(
    foodId: string,
    quantity: number
  ): void {
    this.updateQuantity(
      foodId,
      quantity + 1
    );
  }


  decreaseQuantity(
    foodId: string,
    quantity: number
  ): void {
    if (quantity <= 1) {
      this.removeItem(foodId);
      return;
    }

    this.updateQuantity(
      foodId,
      quantity - 1
    );
  }


  updateQuantity(
    foodId: string,
    quantity: number
  ): void {

    if (
      this.isUpdating(foodId) ||
      this.isRemoving(foodId)
    ) {
      return;
    }

    if (quantity < 1) {
      this.removeItem(foodId);
      return;
    }

    this.store.dispatch(
      CartActions.updateQuantity({
        foodId,
        quantity
      })
    );
  }


  removeItem(foodId: string): void {

    if (
      this.isUpdating(foodId) ||
      this.isRemoving(foodId)
    ) {
      return;
    }

    this.store.dispatch(
      CartActions.removeItem({
        foodId
      })
    );
  }


  clearCart(): void {
    this.store.dispatch(
      CartActions.clearCart()
    );
  }


  applyCoupon(code: string): void {
    this.store.dispatch(
      CartActions.applyCoupon({ code })
    );
  }


  removeCoupon(): void {
    this.store.dispatch(
      CartActions.removeCoupon()
    );
  }


  isUpdating(foodId: string): boolean {
    return this.updatingItemIds().includes(foodId);
  }


  isRemoving(foodId: string): boolean {
    return this.removingItemIds().includes(foodId);
  }


  get restaurantName(): string {
    return this.restaurant()?.name ?? '';
  }


  get itemTotal(): number {
    return this.summary()?.itemTotal ?? 0;
  }


  get discount(): number {
    return this.summary()?.discount ?? 0;
  }


  get deliveryFee(): number {
    return this.summary()?.deliveryFee ?? 0;
  }


  get platformFee(): number {
    return this.summary()?.platformFee ?? 0;
  }


  get gst(): number {
    return this.summary()?.gst ?? 0;
  }


  get gstRate(): number {
    return this.summary()?.gstRate ?? 0;
  }


  get finalTotal(): number {
    return this.summary()?.grandTotal ?? 0;
  }


  browseRestaurants(): void {
    this.router.navigate(
      ['../..'],
      { relativeTo: this.route }
    );
  }


  checkout(): void {
    if (!this.restaurant()) {
      return;
    }

    this.router.navigate(
      ['../checkout'],
      { relativeTo: this.route }
    );
  }

}