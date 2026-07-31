import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter, withInMemoryScrolling } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './core/interceptors/auth.interceptor';
import { errorInterceptor } from './core/interceptors/error.interceptor';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { authReducer } from './store/auth/auth.reducer';
import { AuthEffects } from './store/auth/auth.effects';
import { requestInterceptor } from './core/interceptors/request.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideStore({
      auth: authReducer
    }),
    provideEffects(), // 🔥 root
    provideEffects(AuthEffects),

    provideStoreDevtools({
      maxAge: 25
    }),
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes, withInMemoryScrolling({
      scrollPositionRestoration: 'top',
      anchorScrolling: 'enabled'
    })), provideClientHydration(withEventReplay()),
    provideHttpClient(withFetch(), withInterceptors([
      requestInterceptor,
      authInterceptor,
      errorInterceptor
    ]))
  ]
};
