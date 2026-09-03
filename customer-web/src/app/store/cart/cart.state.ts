import { Cart } from "../../core/cart/models/cart.model";

export type CartStatus =
    | 'idle'
    | 'loading'
    | 'success'
    | 'error';


export interface CartState {
    cart: Cart | null;
    status: CartStatus;
    updatingItemIds: string[];
    removingItemIds: string[];
    error: string | null;
}

export const initialState: CartState = {
    cart: null,
    status: 'idle',
    updatingItemIds: [],
    removingItemIds: [],
    error: null
};