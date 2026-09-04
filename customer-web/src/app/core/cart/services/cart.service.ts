import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cart, CartSummaryResponse } from '../models/cart.model';
import { CouponsResponse } from '../models/coupon.model';

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

    getCartSummary(): Observable<CartSummaryResponse> {
        return this.http.get<CartSummaryResponse>(
            '/api/v1/cart/summary',
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


    getCoupons(): Observable<CouponsResponse> {
        return this.http.get<CouponsResponse>(
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