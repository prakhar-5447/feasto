import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CartState } from './cart.state';

export const selectCartState =
    createFeatureSelector<CartState>('cart');


export const selectCart =
    createSelector(
        selectCartState,
        state => state.cart
    );


export const selectCartItems =
    createSelector(
        selectCart,
        cart => cart?.items ?? []
    );


export const selectCartSummary =
    createSelector(
        selectCart,
        cart => cart?.summary ?? null
    );


export const selectCartRestaurant =
    createSelector(
        selectCart,
        cart => cart?.restaurant ?? null
    );


export const selectCartCoupon =
    createSelector(
        selectCart,
        cart => cart?.coupon ?? null
    );


export const selectCartCount =
    createSelector(
        selectCartItems,
        items =>
            items.reduce(
                (total, item) => total + item.quantity,
                0
            )
    );


export const selectCartItemCount =
    selectCartCount;


export const selectCartStatus =
    createSelector(
        selectCartState,
        state => state.status
    );


export const selectCartLoading =
    createSelector(
        selectCartStatus,
        status => status === 'loading'
    );


export const selectCartError =
    createSelector(
        selectCartState,
        state => state.error
    );


export const selectUpdatingItemIds =
    createSelector(
        selectCartState,
        state => state.updatingItemIds
    );


export const selectRemovingItemIds =
    createSelector(
        selectCartState,
        state => state.removingItemIds
    );


export const selectIsUpdatingItem =
    (foodId: string) =>
        createSelector(
            selectUpdatingItemIds,
            ids => ids.includes(foodId)
        );


export const selectIsRemovingItem =
    (foodId: string) =>
        createSelector(
            selectRemovingItemIds,
            ids => ids.includes(foodId)
        );