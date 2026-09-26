import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// import {
//   PhoneAuthResponse,
//   VerifyOtpResponse,
//   CompleteProfileResponse,
// } from '@/app/features/auth/models/auth.models';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private readonly http: HttpClient
  ) { }

  phoneAuth(
    phone: string
  ): Observable<PhoneAuthResponse> {
    return this.http.post<PhoneAuthResponse>(
      '/api/v1/auth/phone-auth',
      {
        phone,
      },
      {
        withCredentials: true,
      }
    );
  }

  verifyOtp(
    phone: string,
    otp: string
  ): Observable<VerifyOtpResponse> {
    return this.http.post<VerifyOtpResponse>(
      '/api/v1/auth/verify-otp',
      {
        phone,
        otp,
      },
      {
        withCredentials: true,
      }
    );
  }

  completeProfile(
    signupToken: string,
    name: string,
    email?: string
  ): Observable<CompleteProfileResponse> {
    return this.http.post<CompleteProfileResponse>(
      '/api/v1/auth/complete-profile',
      {
        signupToken,
        name,
        email,
      },
      {
        withCredentials: true,
      }
    );
  }

  refreshToken(): Observable<any> {
    return this.http.post(
      '/api/v1/auth/refresh-token',
      {},
      {
        withCredentials: true,
      }
    );
  }

  logout(): Observable<any> {
    return this.http.post(
      '/api/v1/auth/logout',
      {},
      {
        withCredentials: true,
      }
    );
  }
}