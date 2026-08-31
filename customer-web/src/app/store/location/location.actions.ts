import { createAction, props } from '@ngrx/store';

import { SelectedLocation } from '../../core/location/models/location.model';

export const selectLocation = createAction(
    '[Location] Select Location',
    props<{
        location: SelectedLocation;
    }>()
);

export const loadSavedLocation = createAction(
    '[Location] Load Saved Location'
);

export const loadSavedLocationSuccess = createAction(
    '[Location] Load Saved Location Success',
    props<{
        location: SelectedLocation;
    }>()
);

export const loadSavedLocationFailure =
    createAction(
        '[Location] Load Saved Location Failure',
        props<{
            error: string;
        }>()
    );

export const clearLocation = createAction(
    '[Location] Clear Location'
);