// core/location/services/location-storage.service.ts

import { Inject, Injectable, PLATFORM_ID } from '@angular/core';

import { isPlatformBrowser } from '@angular/common';

import { SelectedLocation } from '../models/location.model';

@Injectable({
    providedIn: 'root'
})
export class LocationStorageService {

    private readonly storageKey = 'location';

    constructor(@Inject(PLATFORM_ID) private readonly platformId: object) { }

    save(location: SelectedLocation): void {

        if (!isPlatformBrowser(this.platformId)) {
            return;
        }

        localStorage.setItem(this.storageKey, JSON.stringify(location));

        document.cookie =
            `city=${encodeURIComponent(location.slug)}; ` +
            `path=/; ` +
            `max-age=31536000; ` +
            `SameSite=Lax`;
    }


    load(): SelectedLocation | null {

        if (!isPlatformBrowser(this.platformId)) {
            return null;
        }

        const value = localStorage.getItem(this.storageKey);

        if (!value) {
            return null;
        }

        try {
            return JSON.parse(value) as SelectedLocation;
        } catch {
            return null;
        }
    }


    clear(): void {

        if (!isPlatformBrowser(this.platformId)) {
            return;
        }

        localStorage.removeItem(this.storageKey);

        document.cookie = 'city=; path=/; max-age=0; SameSite=Lax';
    }
}