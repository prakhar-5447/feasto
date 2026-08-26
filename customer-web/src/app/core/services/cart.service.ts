import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

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
    ).pipe(
      tap(() => this.refreshCartCount())
    );
  }

  updateQuantity(
    foodId: string,
    quantity: number
  ) {

    if (quantity <= 0) {
      return this.removeFromCart(foodId);
    }

    return this.http.patch(
      `/api/v1/cart/items/${foodId}`,
      {
        quantity
      },
      {
        withCredentials: true
      }
    ).pipe(
      tap(() => this.refreshCartCount())
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
    ).pipe(
      tap(() => this.refreshCartCount())
    );
  }

  clearCart() {
    return this.http.delete(
      '/api/v1/cart',
      {
        withCredentials: true
      }
    ).pipe(
      tap(() => {
        this.cartCount.set(0);
      })
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

        const items = res.data?.items || [];

        const count = items.reduce(
          (sum: number, item: any) =>
            sum + item.quantity,
          0
        );

        this.cartCount.set(count);
      },

      error: () => {
        this.cartCount.set(0);
      }
    });
  }
}