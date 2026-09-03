import { createAction, props } from '@ngrx/store';
import { Cart } from '../../core/cart/models/cart.model';
import { FoodItem } from '../../core/restaurant/models/menu.model';

export const loadCart = createAction(
    '[Cart] Load Cart'
);

export const loadCartSuccess = createAction(
    '[Cart] Load Cart Success',
    props<{ cart: Cart }>()
);

export const loadCartFailure = createAction(
    '[Cart] Load Cart Failure',
    props<{ error: string }>()
);


// ADD ITEM

export const addItem = createAction(
    '[Cart] Add Item',
    props<{
        food: FoodItem;
        quantity: number;
    }>()
);


export const addItemSuccess = createAction(
    '[Cart] Add Item Success',
    props<{
        cart: Cart;
    }>()
);


export const addItemFailure = createAction(
    '[Cart] Add Item Failure',
    props<{
        error: string;
    }>()
);

// UPDATE QUANTITY

export const updateQuantity = createAction(
    '[Cart] Update Quantity',
    props<{
        foodId: string;
        quantity: number;
    }>()
);

export const updateQuantitySuccess = createAction(
    '[Cart] Update Quantity Success',
    props<{ cart: Cart }>()
);

export const updateQuantityFailure = createAction(
    '[Cart] Update Quantity Failure',
    props<{
        foodId: string;
        error: string;
    }>()
);


// REMOVE ITEM

export const removeItem = createAction(
    '[Cart] Remove Item',
    props<{ foodId: string }>()
);

export const removeItemSuccess = createAction(
    '[Cart] Remove Item Success',
    props<{
        foodId: string;
        cart: Cart;
    }>()
);

export const removeItemFailure = createAction(
    '[Cart] Remove Item Failure',
    props<{
        foodId: string;
        error: string;
    }>()
);


// CLEAR CART

export const clearCart = createAction(
    '[Cart] Clear Cart'
);

export const clearCartSuccess = createAction(
    '[Cart] Clear Cart Success'
);

export const clearCartFailure = createAction(
    '[Cart] Clear Cart Failure',
    props<{ error: string }>()
);


// COUPON

export const applyCoupon = createAction(
    '[Cart] Apply Coupon',
    props<{ code: string }>()
);

export const applyCouponSuccess = createAction(
    '[Cart] Apply Coupon Success',
    props<{ cart: Cart }>()
);

export const applyCouponFailure = createAction(
    '[Cart] Apply Coupon Failure',
    props<{ error: string }>()
);

export const removeCoupon = createAction(
    '[Cart] Remove Coupon'
);

export const removeCouponSuccess = createAction(
    '[Cart] Remove Coupon Success',
    props<{ cart: Cart }>()
);

export const removeCouponFailure = createAction(
    '[Cart] Remove Coupon Failure',
    props<{ error: string }>()
);