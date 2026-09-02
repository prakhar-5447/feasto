import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { HttpClient } from '@angular/common/http';

import * as AuthActions from './auth.actions';
import { AuthService } from '../../core/services/auth.service';

import {
    catchError,
    map,
    mergeMap,
    of,
    tap
} from 'rxjs';


@Injectable()
export class AuthEffects {

    private actions$ = inject(Actions);
    private http = inject(HttpClient);
    private authService = inject(AuthService);
    private router = inject(Router);

    loadUser$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AuthActions.loadUser),

            mergeMap(() =>
                this.http.get<any>('/api/v1/users/me').pipe(

                    map(res =>
                        AuthActions.loadUserSuccess({
                            user: res.data
                        })
                    ),

                    catchError(error =>
                        of(
                            AuthActions.loadUserFailure({
                                error:
                                    error?.error?.message ??
                                    'Failed to load user'
                            })
                        )
                    )
                )
            ),
        )
    );

    sessionExpired$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AuthActions.sessionExpired),



            map(() =>
                AuthActions.clearSession()
            )
        )
    );

    logout$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AuthActions.logout),

            mergeMap(() =>
                this.authService.logout().pipe(
                    map(() => AuthActions.clearSession()),
                    catchError(() =>
                        of(AuthActions.clearSession())
                    )
                )
            ),
            tap(() => {
                this.router.navigate(
                    ['/'],
                    { replaceUrl: true }
                );
            }),
        )
    );
}