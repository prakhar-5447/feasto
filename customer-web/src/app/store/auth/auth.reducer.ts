import { createReducer, on } from '@ngrx/store';
import * as AuthActions from './auth.actions';
import { initialState } from './auth.state';

export const authReducer = createReducer(
    initialState,

    on(AuthActions.loadUser, (state) => ({
        ...state,
        loading: true,
        error: null
    })),

    on(AuthActions.loadUserSuccess, (state, { user }) => ({
        ...state,
        loading: false,
        user
    })),

    on(AuthActions.loadUserFailure, (state, { error }) => ({
        ...state,
        loading: false,
        user: null,
        error
    })),

    on(AuthActions.logout, (state) => ({
        ...state,
        loading: false,
        user: null
    }))
);