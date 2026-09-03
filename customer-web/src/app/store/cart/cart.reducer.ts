import { createReducer, on } from '@ngrx/store';
import * as CartActions from './cart.actions';
import { CartState } from './cart.state';

export const initialCartState: CartState = {
    cart: null,
    status: 'idle',
    updatingItemIds: [],
    removingItemIds: [],
    error: null
};

export const cartReducer = createReducer(

    initialCartState,

    // LOAD

    on(
        CartActions.loadCart,
        state => ({
            ...state,
            status: 'loading',
            error: null
        })
    ),

    on(
        CartActions.loadCartSuccess,
        (state, { cart }) => ({
            ...state,
            cart,
            status: 'success',
            error: null,
            updatingItemIds: [],
            removingItemIds: []
        })
    ),

    on(
        CartActions.loadCartFailure,
        (state, { error }) => ({
            ...state,
            status: 'error',
            error
        })
    ),


    // ADD ITEM

    on(
        CartActions.addItem,
        (state, { food, quantity }) => {
            if (!state.cart) {
                return state;
            }

            const existingItem = state.cart.items.find(
                item => item.food._id === food._id
            );

            const items = existingItem
                ? state.cart.items.map(item =>
                    item.food._id === food._id
                        ? {
                            ...item,
                            quantity: item.quantity + quantity
                        }
                        : item
                )
                : [
                    ...state.cart.items,
                    {
                        food: {
                            _id: food._id,
                            name: food.name,
                            image: food.image ?? '',
                            price: food.price
                        },
                        name: food.name,
                        price: food.price,
                        quantity
                    }
                ];

            return {
                ...state,
                cart: {
                    ...state.cart,
                    items
                },
                error: null
            };
        }
    ),

    on(
        CartActions.addItemSuccess,
        (state, { cart }) => {

            const addedFoodId =
                '6a8ac55cdce5b544dd0f81b1';

            const item =
                cart.items.find(
                    item => item.food._id === addedFoodId
                );

            return {
                ...state,
                cart,
                status: 'success',
                error: null
            };
        }
    ),

    on(
        CartActions.addItemFailure,
        (state, { error }) => ({
            ...state,
            status: 'error',
            error
        })
    ),

    // UPDATE QUANTITY - OPTIMISTIC

    on(
        CartActions.updateQuantity,
        (state, { foodId, quantity }) => {

            if (!state.cart) {
                return state;
            }

            const items = state.cart.items.map(item =>
                item.food._id === foodId
                    ? { ...item, quantity }
                    : item
            );

            return {
                ...state,

                cart: {
                    ...state.cart,
                    items
                },

                updatingItemIds: state.updatingItemIds.includes(foodId)
                    ? state.updatingItemIds
                    : [...state.updatingItemIds, foodId],

                error: null
            };
        }
    ),

    on(
        CartActions.updateQuantitySuccess,
        (state, { cart }) => ({
            ...state,
            cart,
            updatingItemIds: [],
            status: 'success',
            error: null
        })
    ),

    on(
        CartActions.updateQuantityFailure,
        (state, { foodId, error }) => ({
            ...state,
            updatingItemIds: state.updatingItemIds.filter(
                id => id !== foodId
            ),
            error
        })
    ),


    // REMOVE ITEM - OPTIMISTIC

    on(
        CartActions.removeItem,
        (state, { foodId }) => {

            if (!state.cart) {
                return state;
            }

            return {
                ...state,

                cart: {
                    ...state.cart,

                    items: state.cart.items.filter(
                        item => item.food._id !== foodId
                    )
                },

                removingItemIds: [
                    ...state.removingItemIds,
                    foodId
                ],

                error: null
            };
        }
    ),

    on(
        CartActions.removeItemSuccess,
        (state, { cart, foodId }) => ({
            ...state,
            cart,
            removingItemIds: state.removingItemIds.filter(
                id => id !== foodId
            ),
            status: 'success',
            error: null
        })
    ),

    on(
        CartActions.removeItemFailure,
        (state, { foodId, error }) => ({
            ...state,
            removingItemIds:
                state.removingItemIds.filter(
                    id => id !== foodId
                ),
            error
        })
    ),


    // CLEAR CART

    on(
        CartActions.clearCart,
        state => ({
            ...state,
            cart: state.cart
                ? {
                    ...state.cart,
                    items: []
                }
                : null,
            error: null
        })
    ),

    on(
        CartActions.clearCartSuccess,
        state => ({
            ...state,
            cart: null,
            status: 'success',
            error: null,
            updatingItemIds: [],
            removingItemIds: []
        })
    ),

    on(
        CartActions.clearCartFailure,
        (state, { error }) => ({
            ...state,
            error
        })
    ),


    // COUPON

    on(
        CartActions.applyCouponSuccess,
        (state, { cart }) => ({
            ...state,
            cart,
            error: null
        })
    ),

    on(
        CartActions.applyCouponFailure,
        (state, { error }) => ({
            ...state,
            error
        })
    ),

    on(
        CartActions.removeCouponSuccess,
        (state, { cart }) => ({
            ...state,
            cart,
            error: null
        })
    ),

    on(
        CartActions.removeCouponFailure,
        (state, { error }) => ({
            ...state,
            error
        })
    )
);