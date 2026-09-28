export interface LocationSearchResult {

    text: string;

    place_name: string;

    center: [number, number];

    place_type?: string[];

    context?: LocationContext[];
}


export interface LocationContext {

    id?: string;

    text?: string;
}


export interface ReverseGeocodeResult {

    text?: string;

    place_name?: string;

    center?: [number, number];

    context?: LocationContext[];
}