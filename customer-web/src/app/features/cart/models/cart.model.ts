import { CartItem } from "./cart-item.model";
import { Coupon } from "./coupon.model";


export interface CartRestaurant {
    _id: string;
    name: string;
    slug: string;
}

export interface CartSummary {
    itemTotal: number;
    discount: number;
    deliveryFee: number;
    platformFee: number;
    gst: number;
    gstRate: number;
    grandTotal: number;
    coupon?: Coupon;
}

export interface Cart {
    items: CartItem[];
    restaurant?: CartRestaurant;
    summary: CartSummary;
    coupon?: Coupon;
}

export interface CartSummaryResponse {
    data: CartSummary;
}