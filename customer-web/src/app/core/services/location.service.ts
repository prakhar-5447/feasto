import { Inject, inject, Injectable, PLATFORM_ID, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class LocationService {

  constructor(private http: HttpClient) { }

  search(query: string) {
    return this.http.get(`/api/location-search?q=${query}`);
  }

  reverseGeocode(lat: number, lng: number) {
    return this.http.get(`/api/location/reverse?lat=${lat}&lng=${lng}`);
  }
}

@Injectable({ providedIn: 'root' })
export class LocationServicePersistence {

  private citySubject = new BehaviorSubject<string | null>(null);
  city$ = this.citySubject.asObservable();

  constructor(@Inject(PLATFORM_ID) private platformId: Object) { }

  setCity(city: string) {
    const cleanCity = city.toLowerCase();

    this.citySubject.next(cleanCity);

    if (isPlatformBrowser(this.platformId)) {
      document.cookie = `city=${cleanCity}; path=/; max-age=31536000`;
      localStorage.setItem('city', cleanCity);
    }
  }

  loadInitialCity() {
    if (!isPlatformBrowser(this.platformId)) return;

    const cookieMatch = document.cookie.match(/(^| )city=([^;]+)/);
    const cityFromCookie = cookieMatch ? cookieMatch[2] : null;

    const city = cityFromCookie || localStorage.getItem('city');

    if (city) {
      this.citySubject.next(city);
    }
  }

  getCity() {
    return this.citySubject.value;
  }
}