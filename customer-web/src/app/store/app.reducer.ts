import { ActionReducerMap } from '@ngrx/store';
import { cartReducer } from './cart/cart.reducer';
import { AppState } from './app.state';
import { authReducer } from './auth/auth.reducer';
import { locationReducer } from './location/location.reducer';

export const reducers: ActionReducerMap<AppState> = {
    auth: authReducer,
    location: locationReducer,
    cart: cartReducer
};