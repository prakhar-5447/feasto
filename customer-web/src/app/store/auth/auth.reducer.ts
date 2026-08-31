import { createReducer, on } from '@ngrx/store';
import * as AuthActions from './auth.actions';
import { initialState } from './auth.state';

export const authReducer = createReducer(
    initialState,

    // Start checking authentication
    on(AuthActions.loadUser, (state) => ({
        ...state,
        loading: true,
        initialized: false,
        error: null
    })),

    // User found
    on(AuthActions.loadUserSuccess, (state, { user }) => ({
        ...state,
        loading: false,
        initialized: true,
        user,
        error: null
    })),

    // User not logged in / request failed
    on(AuthActions.loadUserFailure, (state, { error }) => ({
        ...state,
        loading: false,
        initialized: true,
        user: null,
        error
    })),

    // Logout / clear session
    on(AuthActions.clearSession, (state) => ({
        ...state,
        loading: false,
        initialized: true,
        user: null,
        error: null
    }))
);