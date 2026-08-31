import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Actions, createEffect, ofType } from '@ngrx/effects';

import { catchError, map, mergeMap, of } from 'rxjs';


import * as AuthActions from './auth.actions';


@Injectable()
export class AuthEffects {
    private actions$ = inject(Actions);
    private http = inject(HttpClient);

    loadUser$ = createEffect(() =>

        this.actions$.pipe(
            ofType(AuthActions.loadUser),
            mergeMap(() =>
                this.http.get('/api/v1/users/me', {
                    withCredentials: true
                }).pipe(
                    map((res: any) =>
                        AuthActions.loadUserSuccess({ user: res.data })
                    ),
                    catchError(() =>
                        of(AuthActions.logout())
                    )
                )
            )
        )

    );
}