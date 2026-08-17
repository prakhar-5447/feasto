import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faTags } from '@fortawesome/free-solid-svg-icons';
import { CartService } from '../../../core/services/cart.service';

@Component({
  selector: 'app-coupons',
  standalone: true,
  imports: [
    FormsModule,
    FontAwesomeModule
  ],
  templateUrl: './coupons.html',
  styleUrl: './coupons.sass',
})
export class Coupons {

  faTags = faTags;

  showCoupons = false;
  couponCode = '';

  availableCoupons: any[] = [];

  appliedCoupon: any = null;

  itemTotal = 0;

  constructor(
    private cartService: CartService
  ) { }

  ngOnInit() {
    this.loadCoupons();
    this.loadSummary();
  }

  loadCoupons() {
    this.cartService
      .getCoupons()
      .subscribe({
        next: (res: any) => {
          this.availableCoupons =
            res.data || [];
        }
      });
  }

  loadSummary() {
    this.cartService
      .getCartSummary()
      .subscribe({
        next: (res: any) => {

          this.itemTotal =
            res.data.itemTotal || 0;

          this.appliedCoupon =
            res.data.coupon || null;
        }
      });
  }

  handleApplyCoupon(coupon: any) {

    this.cartService
      .applyCoupon(coupon.code)
      .subscribe({
        next: () => {

          this.appliedCoupon = coupon;

          this.couponCode = '';

          this.showCoupons = false;

          this.loadSummary();
        },
        error: (err) => {

          alert(
            err.error?.message ||
            'Failed to apply coupon'
          );
        }
      });
  }

  handleApplyCouponCode() {

    const coupon =
      this.availableCoupons.find(
        c =>
          c.code.trim().toLowerCase() ===
          this.couponCode.trim().toLowerCase()
      );

    if (!coupon) {
      alert('Invalid coupon');
      return;
    }

    this.handleApplyCoupon(coupon);
  }

  removeCoupon() {

    this.cartService
      .removeCoupon()
      .subscribe({
        next: () => {

          this.appliedCoupon = null;

          this.loadSummary();
        }
      });
  }
}