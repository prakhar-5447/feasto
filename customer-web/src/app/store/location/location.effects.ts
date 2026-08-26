import {
    Injectable,
    inject
} from '@angular/core';

import {
    Actions,
    createEffect,
    ofType
} from '@ngrx/effects';

import {
    catchError,
    map,
    of,
    tap
} from 'rxjs';

import {
    LocationActions
} from './location.actions';

import {
    LocationStorageService
} from '../../core/location/services/location-storage.service';

@Injectable()
export class LocationEffects {

    private readonly actions$ =
        inject(Actions);

    private readonly storage =
        inject(LocationStorageService);


    saveLocation$ = createEffect(
        () =>
            this.actions$.pipe(

                ofType(
                    LocationActions.selectLocation
                ),

                tap(({ location }) => {

                    this.storage.save(location);

                })

            ),
        {
            dispatch: false
        }
    );


    loadSavedLocation$ = createEffect(
        () =>
            this.actions$.pipe(

                ofType(
                    LocationActions.loadSavedLocation
                ),

                map(() => {

                    const location =
                        this.storage.load();

                    if (!location) {

                        return LocationActions
                            .loadSavedLocationFailure({
                                error:
                                    'No saved location found'
                            });
                    }

                    return LocationActions
                        .loadSavedLocationSuccess({
                            location
                        });
                }),

                catchError(error =>
                    of(
                        LocationActions
                            .loadSavedLocationFailure({
                                error:
                                    error?.message ??
                                    'Unable to load saved location'
                            })
                    )
                )
            )
    );
}