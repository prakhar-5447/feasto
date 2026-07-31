import { Inject, Injectable, Optional } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { REQUEST_ID } from '../tokens/request-id.token';
@Injectable({
  providedIn: 'root'
})
export class LoggerService {
  constructor(private http: HttpClient, @Optional() @Inject(REQUEST_ID) private requestId?: string) { }
  // logger.service.ts
  logClientRoute(url: string) {
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

    // optional console
    // console.log('[CLIENT]', payload);

    // send to backend
    this.http.post('/api/logs', payload, { headers: { 'x-client-log': 'true'} }).subscribe();
  }
}