import {
    SelectedLocation
} from '../../core/location/models/location.model';


export type LocationStatus =
    | 'idle'
    | 'loading'
    | 'success'
    | 'error';


export interface LocationState {

    selectedLocation:
    SelectedLocation | null;

    status:
    LocationStatus;

    error:
    string | null;
}


export const initialLocationState:
    LocationState = {

    selectedLocation: null,

    status: 'idle',

    error: null
};