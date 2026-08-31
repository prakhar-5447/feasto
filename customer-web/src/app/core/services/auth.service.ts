import {
  Inject,
  Injectable,
  PLATFORM_ID
} from '@angular/core';

import {
  isPlatformBrowser
} from '@angular/common';

import {
  HttpClient
} from '@angular/common/http';

import {
  Observable
} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private readonly http: HttpClient
  ) { }

  refreshToken(): Observable<any> {
    return this.http.post(
      '/api/v1/auth/refresh-token',
      {},
      {
        withCredentials: true
      }
    );
  }

  logout(): Observable<any> {
    return this.http.post(
      '/api/v1/auth/logout',
      {},
      {
        withCredentials: true
      }
    );
  }
}