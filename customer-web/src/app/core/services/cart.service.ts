import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartCount = signal<number>(0);

  constructor(
    private http: HttpClient
  ) { }

  getCart() {
    return this.http.get(
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

  getCartSummary() {
    return this.http.get(
      '/api/v1/cart/summary',
      {
        withCredentials: true
      }
    );
  }

  addToCart(
    foodId: string,
    quantity: number = 1
  ) {
    return this.http.post(
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
  ) {
    return this.http.patch(
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
  ) {
    return this.http.delete(
      `/api/v1/cart/items/${foodId}`,
      {
        withCredentials: true
      }
    );
  }

  clearCart() {
    return this.http.delete(
      '/api/v1/cart',
      {
        withCredentials: true
      }
    );
  }

  applyCoupon(code: string) {
    return this.http.post(
      '/api/v1/cart/apply-coupon',
      {
        code
      },
      {
        withCredentials: true
      }
    );
  }

  removeCoupon() {
    return this.http.delete(
      '/api/v1/cart/remove-coupon',
      {
        withCredentials: true
      }
    );
  }

  refreshCartCount() {

    this.getCart().subscribe({
      next: (res: any) => {

        const count = res.data.items.reduce(
          (sum: number, item: any) =>
            sum + item.quantity,
          0
        );

        this.cartCount.set(count);
      }
    });
  }
}