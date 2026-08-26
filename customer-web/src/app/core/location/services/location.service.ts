import { inject, Injectable } from '@angular/core';

import { HttpClient, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs';

import { LocationSearchResult, ReverseGeocodeResult } from '../models/location-api.model';

@Injectable({
    providedIn: 'root'
})
export class LocationService {

    private readonly http =
        inject(HttpClient);


    search(query: string): Observable<LocationSearchResult[]> {

        const params =
            new HttpParams()
                .set('q', query);

        return this.http.get<LocationSearchResult[]>(
            '/api/location-search',
            { params }
        );
    }


    reverseGeocode(latitude: number, longitude: number): Observable<ReverseGeocodeResult> {

        const params =
            new HttpParams()
                .set('lat', latitude)
                .set('lng', longitude);

        return this.http.get<ReverseGeocodeResult>(
            '/api/location/reverse',
            { params }
        );
    }
}