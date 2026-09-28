export type LocationSource =
    | 'search'
    | 'gps';

export interface SelectedLocation {

    city: string;

    slug: string;

    latitude: number;

    longitude: number;

    source: LocationSource;
}