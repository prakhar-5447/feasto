import {
    createActionGroup,
    emptyProps,
    props
} from '@ngrx/store';

import {
    SelectedLocation
} from '../../core/location/models/location.model';


export const LocationActions =
    createActionGroup({

        source: 'Location',

        events: {

            'Select Location':
                props<{
                    location: SelectedLocation;
                }>(),


            'Load Saved Location':
                emptyProps(),


            'Load Saved Location Success':
                props<{
                    location: SelectedLocation;
                }>(),


            'Load Saved Location Failure':
                props<{
                    error: string;
                }>(),


            'Clear Location':
                emptyProps()
        }
    });