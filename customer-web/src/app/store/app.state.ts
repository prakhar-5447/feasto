import { AuthState } from './auth/auth.state';
import { CartState } from './cart/cart.state';
import { LocationState } from './location/location.state';

export interface AppState {
    auth: AuthState;
    location: LocationState;
    cart: CartState;
}