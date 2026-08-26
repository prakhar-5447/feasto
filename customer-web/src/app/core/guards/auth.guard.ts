import { inject } from '@angular/core';
import {
  CanActivateFn,
  Router
} from '@angular/router';

import { Store } from '@ngrx/store';

import {
  catchError,
  map,
  of,
  take
} from 'rxjs';

import { AppState } from '../../store/app.state';
import {
  selectUser
} from '../../store/auth/auth.selectors';

import * as AuthActions
  from '../../store/auth/auth.actions';


export const authGuard: CanActivateFn = () => {

  const store = inject(Store<AppState>);
  const router = inject(Router);


  return store.select(selectUser).pipe(

    take(1),

    map(user => {

      if (user) {
        return true;
      }

      store.dispatch(
        AuthActions.loadUser()
      );

      return router.createUrlTree([
        '/login'
      ]);
    }),

    catchError(() =>
      of(
        router.createUrlTree([
          '/login'
        ])
      )
    )
  );
};