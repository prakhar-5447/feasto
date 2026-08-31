import {
  Inject,
  Injectable,
  PLATFORM_ID
} from '@angular/core';

import {
  isPlatformBrowser
} from '@angular/common';

import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class LoggerService {

  constructor(
    private readonly http: HttpClient,

    @Inject(PLATFORM_ID)
    private readonly platformId: Object
  ) { }


  logClientRoute(url: string): void {

    if (!isPlatformBrowser(this.platformId)) {
      return;
    }


    const payload = {
      type: 'CLIENT',
      method: 'GET',
      path: url,
      status: 200,
      duration: 0,
      ua: navigator.userAgent,
      ref: document.referrer || undefined,
      timestamp: new Date().toISOString()
    };


    this.http.post(
      '/api/logs',
      payload,
      {
        headers: {
          'x-client-log': 'true'
        }
      }
    ).subscribe();
  }
}