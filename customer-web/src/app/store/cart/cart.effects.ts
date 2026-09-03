import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, concatMap, map, of, tap } from 'rxjs';

import * as CartActions from './cart.actions';
import { CartService } from '../../core/cart/services/cart.service';

@Injectable()
export class CartEffects {

  private readonly actions$ = inject(Actions);
  private readonly cartService = inject(CartService);


  // LOAD CART
  loadCart$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CartActions.loadCart),

      concatMap(() =>
        this.cartService.getCart().pipe(

          map(response =>
            CartActions.loadCartSuccess({
              cart: response.data
            })
          ),

          catchError(error =>
            of(
              CartActions.loadCartFailure({
                error:
                  error?.error?.message ??
                  'Unable to load cart'
              })
            )
          )
        )
      )
    )
  );

  addItem$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CartActions.addItem),

      concatMap(({ food, quantity }) =>
        this.cartService.addToCart(food._id, quantity).pipe(

          map(response =>
            CartActions.addItemSuccess({
              cart: response.data
            })
          ),

          catchError(error => {
            console.error(
              'ADD ITEM ERROR:',
              error
            );

            return of(
              CartActions.addItemFailure({
                error:
                  error?.error?.message ??
                  'Unable to add item'
              })
            );
          })
        )
      )
    )
  );

  // UPDATE QUANTITY

  updateQuantity$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CartActions.updateQuantity),

      concatMap(({ foodId, quantity }) =>
        this.cartService
          .updateQuantity(foodId, quantity)
          .pipe(

            map(response =>
              CartActions.updateQuantitySuccess({
                cart: response.data
              })
            ),

            catchError(error =>
              of(
                CartActions.updateQuantityFailure({
                  foodId,
                  error:
                    error?.error?.message ??
                    'Unable to update quantity'
                })
              )
            )
          )
      )
    )
  );



  // REMOVE ITEM

  removeItem$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CartActions.removeItem),

      concatMap(({ foodId }) =>
        this.cartService.removeFromCart(foodId).pipe(

          map(response =>
            CartActions.removeItemSuccess({
              foodId,
              cart: response.data
            })
          ),

          catchError(error => {
            console.error(
              'REMOVE ITEM ERROR:',
              error
            );

            return of(
              CartActions.removeItemFailure({
                foodId,
                error:
                  error?.error?.message ??
                  'Unable to remove item'
              })
            );
          })
        )
      )
    )
  );

  // CLEAR CART

  clearCart$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CartActions.clearCart),

      concatMap(() =>
        this.cartService.clearCart().pipe(

          map(() =>
            CartActions.clearCartSuccess()
          ),

          catchError(error =>
            of(
              CartActions.clearCartFailure({
                error:
                  error?.error?.message ??
                  'Unable to clear cart'
              })
            )
          )
        )
      )
    )
  );


  // APPLY COUPON

  applyCoupon$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CartActions.applyCoupon),

      concatMap(({ code }) =>
        this.cartService.applyCoupon(code).pipe(

          map(response =>
            CartActions.applyCouponSuccess({
              cart: response.data
            })
          ),

          catchError(error =>
            of(
              CartActions.applyCouponFailure({
                error:
                  error?.error?.message ??
                  'Unable to apply coupon'
              })
            )
          )
        )
      )
    )
  );


  // REMOVE COUPON

  removeCoupon$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CartActions.removeCoupon),

      concatMap(() =>
        this.cartService.removeCoupon().pipe(

          map(response =>
            CartActions.removeCouponSuccess({
              cart: response.data
            })
          ),

          catchError(error =>
            of(
              CartActions.removeCouponFailure({
                error:
                  error?.error?.message ??
                  'Unable to remove coupon'
              })
            )
          )
        )
      )
    )
  );
}