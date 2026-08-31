import { createReducer, on } from '@ngrx/store';

import * as LocationActions from './location.actions';

import { initialLocationState } from './location.state';


export const locationReducer =
    createReducer(

        initialLocationState,


        on(
            LocationActions.selectLocation,

            (state, { location }) => ({

                ...state,

                selectedLocation:
                    location,

                status:
                    'success',

                error:
                    null
            })
        ),


        on(
            LocationActions.loadSavedLocation,

            state => ({

                ...state,

                status:
                    'loading',

                error:
                    null
            })
        ),


        on(
            LocationActions
                .loadSavedLocationSuccess,

            (state, { location }) => ({

                ...state,

                selectedLocation:
                    location,

                status:
                    'success',

                error:
                    null
            })
        ),


        on(
            LocationActions
                .loadSavedLocationFailure,

            (state, { error }) => ({

                ...state,

                selectedLocation:
                    null,

                status:
                    'error',

                error
            })
        ),


        on(
            LocationActions.clearLocation,

            () => initialLocationState
        )
    );