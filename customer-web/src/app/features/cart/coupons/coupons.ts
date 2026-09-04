import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal
} from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faTags } from '@fortawesome/free-solid-svg-icons';

import { CartService } from '../../../core/cart/services/cart.service';
import { Input } from '../../../shared/components/input/input';
import { Button } from '../../../shared/components/button/button';
import { Coupon } from '../../../core/cart/models/coupon.model';

@Component({
  selector: 'app-coupons',
  standalone: true,
  imports: [
    FontAwesomeModule,
    Input,
    Button
  ],
  templateUrl: './coupons.html',
  styleUrl: './coupons.sass',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Coupons {

  private readonly cartService = inject(CartService);

  readonly faTags = faTags;

  readonly showCoupons = signal(false);
  readonly couponCode = signal('');

  readonly availableCoupons = signal<Coupon[]>([]);
  readonly appliedCoupon = signal<Coupon | null>(null);

  readonly itemTotal = signal(0);

  readonly applying = signal(false);
  readonly removing = signal(false);

  ngOnInit(): void {
    this.loadCoupons();
    this.loadSummary();
  }

 private loadCoupons(): void {
    this.cartService.getCoupons().subscribe({
        next: response => {
            this.availableCoupons.set(response.data ?? []);
        }
    });
}

  private loadSummary(): void {
    this.cartService.getCartSummary().subscribe({
      next: (response: any) => {
        const summary = response.data;

        this.itemTotal.set(summary?.itemTotal ?? 0);
        this.appliedCoupon.set(summary?.coupon ?? null);
      }
    });
  }

  toggleCoupons(): void {
    this.showCoupons.update(value => !value);
  }

  applyCoupon(coupon: Coupon): void {
    if (this.applying() || this.removing()) {
      return;
    }

    if (this.itemTotal() < (coupon.minOrder ?? 0)) {
      return;
    }

    this.applying.set(true);

    this.cartService.applyCoupon(coupon.code).subscribe({
      next: () => {
        this.appliedCoupon.set(coupon);
        this.couponCode.set('');
        this.showCoupons.set(false);

        this.loadSummary();
      },
      error: (error) => {
        alert(
          error.error?.message ??
          'Failed to apply coupon'
        );
      },
      complete: () => {
        this.applying.set(false);
      }
    });
  }

  applyCouponCode(): void {
    const code = this.couponCode().trim();

    if (!code || this.applying()) {
      return;
    }

    const coupon = this.availableCoupons().find(
      coupon =>
        coupon.code.toLowerCase() === code.toLowerCase()
    );

    if (!coupon) {
      alert('Invalid coupon');
      return;
    }

    this.applyCoupon(coupon);
  }

  removeCoupon(): void {
    if (this.removing() || this.applying()) {
      return;
    }

    this.removing.set(true);

    this.cartService.removeCoupon().subscribe({
      next: () => {
        this.appliedCoupon.set(null);
        this.loadSummary();
      },
      error: (error) => {
        alert(
          error.error?.message ??
          'Failed to remove coupon'
        );
      },
      complete: () => {
        this.removing.set(false);
      }
    });
  }

  isCouponDisabled(coupon: Coupon): boolean {
    return this.itemTotal() < (coupon.minOrder ?? 0);
  }

  remainingAmount(coupon: Coupon): number {
    return Math.max(
      0,
      (coupon.minOrder ?? 0) - this.itemTotal()
    );
  }
}