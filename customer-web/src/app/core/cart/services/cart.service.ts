import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cart } from '../models/cart.model';

interface CartResponse {
    data: Cart;
    success: boolean;
}

@Injectable({
    providedIn: 'root'
})
export class CartService {

    private readonly http = inject(HttpClient);

    getCart(): Observable<CartResponse> {
        return this.http.get<CartResponse>(
            '/api/v1/cart',
            {
                withCredentials: true
            }
        );
    }


    addToCart(
        foodId: string,
        quantity: number = 1
    ): Observable<CartResponse> {

        return this.http.post<CartResponse>(
            '/api/v1/cart/items',
            {
                foodId,
                quantity
            },
            {
                withCredentials: true
            }
        );
    }


    updateQuantity(
        foodId: string,
        quantity: number
    ): Observable<CartResponse> {

        return this.http.patch<CartResponse>(
            `/api/v1/cart/items/${foodId}`,
            {
                quantity
            },
            {
                withCredentials: true
            }
        );
    }


    removeFromCart(
        foodId: string
    ): Observable<CartResponse> {

        return this.http.delete<CartResponse>(
            `/api/v1/cart/items/${foodId}`,
            {
                withCredentials: true
            }
        );
    }


    clearCart(): Observable<void> {

        return this.http.delete<void>(
            '/api/v1/cart',
            {
                withCredentials: true
            }
        );
    }


    getCoupons() {
        return this.http.get(
            '/api/v1/coupons'
        );
    }


    applyCoupon(
        code: string
    ): Observable<CartResponse> {

        return this.http.post<CartResponse>(
            '/api/v1/cart/apply-coupon',
            { code },
            {
                withCredentials: true
            }
        );
    }


    removeCoupon(): Observable<CartResponse> {

        return this.http.delete<CartResponse>(
            '/api/v1/cart/remove-coupon',
            {
                withCredentials: true
            }
        );
    }
}