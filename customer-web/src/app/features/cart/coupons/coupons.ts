import { Component } from '@angular/core';
import { CartService, Coupon } from '../../../core/services/cart.service';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faTags } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-coupons',
  standalone: true,
  imports: [FormsModule, FontAwesomeModule],
  templateUrl: './coupons.html',
  styleUrl: './coupons.sass',
})
export class Coupons {
  faTags = faTags
  showCoupons = false;
  couponCode = '';

  constructor(public cartService: CartService) { }

  availableCoupons: Coupon[] = [
    {
      id: 1,
      code: "FEAST50",
      description: "50% off up to ₹100 on orders above ₹199",
      discount: 50,
      discountType: "percentage",
      minOrder: 199,
      maxDiscount: 100,
    },
    {
      id: 2,
      code: "FLAT100",
      description: "Flat ₹100 off on orders above ₹299",
      discount: 100,
      discountType: "flat",
      minOrder: 299,
    },
    {
      id: 3,
      code: "WELCOME30",
      description: "30% off up to ₹150 on orders above ₹149",
      discount: 30,
      discountType: "percentage",
      minOrder: 149,
      maxDiscount: 150,
    },
    {
      id: 4,
      code: "SAVE60",
      description: "Flat ₹60 off on orders above ₹199",
      discount: 60,
      discountType: "flat",
      minOrder: 199,
    },
    {
      id: 5,
      code: "MEGA200",
      description: "Flat ₹200 off on orders above ₹499",
      discount: 200,
      discountType: "flat",
      minOrder: 499,
    },
  ];

  get appliedCoupon() {
    return this.cartService.getAppliedCoupon();
  }

  get itemTotal() {
    return this.cartService.getTotal();
  }

  handleApplyCoupon(coupon: Coupon) {
    const res = this.cartService.applyCoupon(coupon.code);

    if (res.success) {
      this.showCoupons = false;
      this.couponCode = '';
      console.log(`Coupon ${coupon.code} applied`);
    } else {
      console.log(res.message);
    }
  }

  handleApplyCouponCode() {
    const coupon = this.availableCoupons.find(
      c => c.code.toLowerCase() === this.couponCode.toLowerCase()
    );

    if (!coupon) {
      alert('Invalid coupon code');
      return;
    }

    this.handleApplyCoupon(coupon);
  }

  removeCoupon() {
    this.cartService.removeCoupon();
  }
}
