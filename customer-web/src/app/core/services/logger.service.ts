import {
  Inject,
  Injectable,
  Optional,
  PLATFORM_ID
} from '@angular/core';

import {
  isPlatformBrowser
} from '@angular/common';

import { HttpClient } from '@angular/common/http';
import { REQUEST_ID } from '../tokens/request-id.token';

@Injectable({
  providedIn: 'root'
})
export class LoggerService {

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID)
    private platformId: Object,
    @Optional()
    @Inject(REQUEST_ID)
    private requestId?: string
  ) { }

  logClientRoute(url: string) {

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