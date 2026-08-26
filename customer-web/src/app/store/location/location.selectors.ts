import {
    createFeatureSelector,
    createSelector
} from '@ngrx/store';

import {
    LocationState
} from './location.state';


export const selectLocationState =
    createFeatureSelector<LocationState>(
        'location'
    );


export const selectSelectedLocation =
    createSelector(

        selectLocationState,

        state =>
            state.selectedLocation
    );


export const selectCity =
    createSelector(

        selectSelectedLocation,

        location =>
            location?.city ?? null
    );


export const selectCitySlug =
    createSelector(

        selectSelectedLocation,

        location =>
            location?.slug ?? null
    );


export const selectCoordinates =
    createSelector(

        selectSelectedLocation,

        location => {

            if (!location) {
                return null;
            }

            return {

                latitude:
                    location.latitude,

                longitude:
                    location.longitude
            };
        }
    );


export const selectLocationSource =
    createSelector(

        selectSelectedLocation,

        location =>
            location?.source ?? null
    );


export const selectLocationStatus =
    createSelector(

        selectLocationState,

        state =>
            state.status
    );


export const selectLocationError =
    createSelector(

        selectLocationState,

        state =>
            state.error
    );