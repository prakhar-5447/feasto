import { Injectable } from '@angular/core';
import { RestaurantService } from './restaurent.service';

export interface Coupon {
    id: number,
    code: string;
    description: string;
    discount: number;
    discountType: "percentage" | "flat";
    minOrder: number;
    maxDiscount?: number;
}
export interface CartItem {
    id: string;
    name: string;
    price: number;
    quantity: number;
    image?: string;
    restaurantId: string;
    restaurantName: string;
}

@Injectable({
    providedIn: 'root',
})
export class CartService {


    private appliedCoupon: Coupon | null = null;

    // 🔥 Dummy coupons (replace later with API)
    private coupons: Coupon[] = [
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
        }
    ];

    constructor(private restaurantService: RestaurantService) { }

    // ✅ Apply Coupon
    applyCoupon(code: string): { success: boolean; message: string } {
        const coupon = this.coupons.find(c => c.code === code.toUpperCase());

        if (!coupon) {
            return { success: false, message: 'Invalid coupon' };
        }

        const total = this.getTotal();

        if (coupon.minOrder && total < coupon.minOrder) {
            return {
                success: false,
                message: `Minimum order ₹${coupon.minOrder} required`
            };
        }

        this.appliedCoupon = coupon;

        return { success: true, message: 'Coupon applied successfully' };
    }

    // ✅ Remove Coupon
    removeCoupon() {
        this.appliedCoupon = null;
    }

    // ✅ Get Discount Amount
    getDiscount(): number {
        if (!this.appliedCoupon) return 0;

        const total = this.getTotal();

        if (this.appliedCoupon.discountType === 'flat') {
            return this.appliedCoupon.discount;
        }

        if (this.appliedCoupon.discountType === 'percentage') {
            let discount = (total * this.appliedCoupon.discount) / 100;

            if (this.appliedCoupon.maxDiscount) {
                discount = Math.min(discount, this.appliedCoupon.maxDiscount);
            }

            return Math.round(discount);
        }

        return 0;
    }

    // ✅ Get Applied Coupon
    getAppliedCoupon(): Coupon | null {
        return this.appliedCoupon;
    }
    // ✅ Add item
    addToCart(item: Omit<CartItem, 'quantity'>): boolean {
        const rs = this.restaurantService;

        if (rs.restaurantId && rs.restaurantId !== item.restaurantId) {
            return false;
        }

        rs.restaurantId = item.restaurantId;

        const existingItem = rs.cart.find((i) => i.id === item.id);

        if (existingItem) {
            existingItem.quantity++;
        } else {
            rs.cart.push({ ...item, quantity: 1 });
        }

        rs.persist();
        return true;
    }

    updateQuantity(itemId: string, quantity: number) {
        const rs = this.restaurantService;
        const item = rs.cart.find((i) => i.id === itemId);

        if (!item) return;

        if (quantity <= 0) {
            this.removeFromCart(itemId);
        } else {
            item.quantity = quantity;
        }

        rs.persist();
    }

    removeFromCart(itemId: string) {
        const rs = this.restaurantService;

        rs.cart = rs.cart.filter((i) => i.id !== itemId);

        if (rs.cart.length === 0) {
            rs.restaurantId = null;
        }

        rs.persist();
    }

    clearCart() {
        const rs = this.restaurantService;

        rs.cart = [];
        rs.restaurantId = null;

        rs.persist();
    }

    getTotal(): number {
        return this.restaurantService.cart.reduce(
            (sum, item) => sum + item.price * item.quantity,
            0
        );
    }

    getItemCount(): number {
        return this.restaurantService.cart.reduce(
            (sum, item) => sum + item.quantity,
            0
        );
    }
}