import {
  HttpErrorResponse,
  HttpInterceptorFn
} from '@angular/common/http';

import {
  inject,
  PLATFORM_ID
} from '@angular/core';

import {
  isPlatformBrowser
} from '@angular/common';

import { Store } from '@ngrx/store';

import {
  BehaviorSubject,
  catchError,
  filter,
  switchMap,
  take,
  throwError
} from 'rxjs';

import { AuthService } from '../services/auth.service';
import * as AuthActions from '../../store/auth/auth.actions';
import { AppState } from '../../store/app.state';

let isRefreshing = false;

const refreshTokenSubject =
  new BehaviorSubject<boolean | null>(null);

export const authInterceptor: HttpInterceptorFn = (
  req,
  next
) => {

  const authService = inject(AuthService);
  const store = inject(Store<AppState>);
  const platformId = inject(PLATFORM_ID);

  const request = req.clone({
    withCredentials: true
  });

  return next(request).pipe(

    catchError((error: HttpErrorResponse) => {

      // Only handle 401
      if (error.status !== 401) {
        return throwError(() => error);
      }

      // Don't refresh during SSR
      if (!isPlatformBrowser(platformId)) {
        return throwError(() => error);
      }

      // Refresh token itself has expired/been revoked
      if (
        req.url.includes('/api/v1/auth/refresh-token')
      ) {

        isRefreshing = false;
        refreshTokenSubject.next(false);

        store.dispatch(
          AuthActions.sessionExpired()
        );

        return throwError(() => error);
      }

      // Another request is already refreshing
      if (isRefreshing) {

        return refreshTokenSubject.pipe(

          filter(value => value !== null),

          take(1),

          switchMap(success => {

            if (!success) {
              return throwError(() => error);
            }

            return next(
              req.clone({
                withCredentials: true
              })
            );
          })
        );
      }

      // Start refresh
      isRefreshing = true;

      refreshTokenSubject.next(null);

      return authService
        .refreshToken()
        .pipe(

          switchMap(() => {

            isRefreshing = false;

            refreshTokenSubject.next(true);

            // Retry original request
            return next(
              req.clone({
                withCredentials: true
              })
            );
          }),

          catchError(refreshError => {

            isRefreshing = false;

            refreshTokenSubject.next(false);

            store.dispatch(
              AuthActions.sessionExpired()
            );

            return throwError(
              () => refreshError
            );
          })
        );
    })
  );
};