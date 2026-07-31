import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { CartItem } from './cart.service';

@Injectable({
    providedIn: 'root'
})
export class RestaurantService {
    restaurant: any;
    menu: any;
    reviews: any;

    // ✅ Cart state moved here
    cart: CartItem[] = [];
    restaurantId: string | null = null;
    private isBrowser: boolean;

    constructor(@Inject(PLATFORM_ID) private platformId: Object) {
        this.isBrowser = isPlatformBrowser(this.platformId);

        if (this.isBrowser) {
            this.loadCart();
        }
    }

    private saveCart() {
        if (!this.isBrowser) return;

        localStorage.setItem('cart', JSON.stringify(this.cart));
        localStorage.setItem('restaurantId', this.restaurantId || '');
    }

    private loadCart() {
        if (!this.isBrowser) return;

        const cartData = localStorage.getItem('cart');
        const restaurantId = localStorage.getItem('restaurantId');

        if (cartData) {
            this.cart = JSON.parse(cartData);
        }

        if (restaurantId) {
            this.restaurantId = restaurantId;
        }
    }

    persist() {
        this.saveCart();
    }
}