import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from './auth.state';

// 🔥 feature key must match provideStore
export const selectAuthState =
    createFeatureSelector<AuthState>('auth');

// ✅ THIS IS REQUIRED
export const selectUser = createSelector(
    selectAuthState,
    (state: AuthState | undefined) => state ? state.user : null
);