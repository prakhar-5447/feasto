import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

import { catchError, map, of } from 'rxjs';

import { LocationService } from '../../core/location/services/location.service';

import { Store } from '@ngrx/store';
import { SelectedLocation } from '../location/models/location.model';
import * as LocationActions from '../../store/location/location.actions';

import { SlugPipe } from '../../shared/pipes/slug.pipe';
import { selectSelectedLocation } from '../../store/location/location.selectors';

export const validCityGuard: CanActivateFn = route => {
    const locationService = inject(LocationService);
    const store = inject(Store);
    const router = inject(Router);
    const slugPipe = inject(SlugPipe);

    const city = route.paramMap.get('city');

    if (!city) {
        return router.createUrlTree(['/india']);
    }

    const citySlug = slugPipe.transform(city);

    // Get currently selected location
    const currentLocation = store.selectSignal(
        selectSelectedLocation
    )();

    return locationService
        .search(city)
        .pipe(

            map(results => {

                const result = results.find(
                    item =>
                        slugPipe.transform(item.text) === citySlug
                );

                if (!result) {
                    return router.createUrlTree(['/india']);
                }

                const [longitude, latitude] = result.center;

                /*
                 * Only update the store if the city actually changed.
                 */
                if (currentLocation?.slug !== citySlug) {

                    const location: SelectedLocation = {
                        city: result.text,
                        slug: citySlug,
                        latitude,
                        longitude,
                        source: 'search'
                    };

                    store.dispatch(
                        LocationActions.selectLocation({
                            location
                        })
                    );
                }

                return true;
            }),

            catchError(() =>
                of(
                    router.createUrlTree(['/india'])
                )
            )
        );
};