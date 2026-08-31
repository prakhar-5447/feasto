import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideRouter, withInMemoryScrolling } from '@angular/router';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';

import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';

import { routes } from './app.routes';

import { authReducer } from './store/auth/auth.reducer';
import { locationReducer } from './store/location/location.reducer';

import { AuthEffects } from './store/auth/auth.effects';
import { LocationEffects } from './store/location/location.effects';

import { requestInterceptor } from './core/interceptors/request.interceptor';
import { authInterceptor } from './core/interceptors/auth.interceptor';
import { errorInterceptor } from './core/interceptors/error.interceptor';

import { SlugPipe } from './shared/pipes/slug.pipe';
import { LabelPipe } from './shared/pipes/label.pipe';

export const appConfig: ApplicationConfig = {
  providers: [

    // ─────────────────────────────────────────────
    // Angular
    // ─────────────────────────────────────────────

    provideBrowserGlobalErrorListeners(),

    provideRouter(
      routes,
      withInMemoryScrolling({
        scrollPositionRestoration: 'top',
        anchorScrolling: 'enabled'
      })
    ),

    provideClientHydration(
      withEventReplay()
    ),


    // ─────────────────────────────────────────────
    // HTTP
    // ─────────────────────────────────────────────

    provideHttpClient(
      withFetch(),
      withInterceptors([
        requestInterceptor,
        authInterceptor,
        errorInterceptor
      ])
    ),


    // ─────────────────────────────────────────────
    // NgRx Store
    // ─────────────────────────────────────────────

    provideStore({
      auth: authReducer,
      location: locationReducer
    }),

    provideEffects(
      AuthEffects,
      LocationEffects
    ),

    provideStoreDevtools({
      maxAge: 25
    }),


    // ─────────────────────────────────────────────
    // Shared
    // ─────────────────────────────────────────────

    SlugPipe,
    LabelPipe

  ]
};
