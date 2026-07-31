import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, EventEmitter, Output, QueryList, ViewChildren, inject, model, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faMobileScreen
} from '@fortawesome/free-solid-svg-icons';
import { Store } from '@ngrx/store';
import * as AuthActions from '../../store/auth/auth.actions';
import { AppState } from '../../store/app.state';
import { Observable } from 'rxjs';
import { selectUser } from '../../store/auth/auth.selectors';
import { NgClass } from '@angular/common';

type AuthStep = 'phone' | 'otp' | 'details';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [FormsModule, FontAwesomeModule, NgClass],
  templateUrl: './auth.html',
  styleUrl: './auth.sass',
})
export class Auth {
  @Output() closeAuth = new EventEmitter<void>();
  faMobileScreen = faMobileScreen;
  step = signal<'phone' | 'details' | 'otp'>('phone');

  phoneNumber = '';
  name = '';
  email = '';

  loading = false;

  otpArray = [0, 1, 2, 3, 4, 5];
  otpValues: string[] = ['', '', '', '', '', ''];

  timer = signal(30);
  resendDisabled = signal(true);
  private intervalId: any;

  @ViewChildren('otpInput') otpInputs!: QueryList<ElementRef>;
  private store = inject(Store<AppState>);

  constructor(private router: Router, private http: HttpClient) { }

  get otp(): string {
    return this.otpValues.join('');
  }

  sendOTP() {
    if (this.phoneNumber.length !== 10) return;
    this.loading = true;
    setTimeout(() => {
      this.loading = false;
      this.step.set('otp');
      this.startResendTimer();

      setTimeout(() => {
        this.otpInputs.first.nativeElement.focus();
      });
    }, 800);
  }

  verifyOTP() {
    if (this.otp.length !== 6) return;
    this.loading = true;
    setTimeout(() => {
      this.loading = false;
      // simulate API response
      const existingUser = Math.random() > 0.5;
      if (existingUser) {
        this.loginSuccess();
      } else {
        this.step.set('details');
      }
    }, 1000);
  }

  startResendTimer() {
    this.resendDisabled.set(true);
    this.timer.set(30);

    this.intervalId = setInterval(() => {
      const current = this.timer();

      if (current > 0) {
        this.timer.set(current - 1);
      }

      if (current <= 1) {
        clearInterval(this.intervalId);
        this.resendDisabled.set(false);
      }
    }, 1000);
  }


  resendOtp() {
    if (this.resendDisabled()) return;
    this.startResendTimer();
  }

  loginSuccess() {
    alert('Login success');
    this.router.navigate(['/app']);
  }

  user$: Observable<any> = this.store.select(selectUser);

  completeSignup() {

    if (!this.name || this.name.length < 2) {
      alert('Enter valid name');
      return;
    }

    if (this.email && !this.email.includes('@')) {
      alert('Enter valid email');
      return;
    }

    this.http.post('/api/v1/auth/complete-profile', {
      phone: this.phoneNumber,
      name: this.name,
      email: this.email || undefined
    }, { withCredentials: true })
      .subscribe(() => {
        this.store.dispatch(AuthActions.loadUser());
        Promise.resolve().then(() => {
          // this.router.navigate(['/']);
          console.log("qwweqw")
          this.closeAuth.emit()
        });
      });
  }

  continueWithPhone() {
    if (!this.isPhoneValid || this.loading) return;

    this.loading = true;

    this.http.post('/api/v1/auth/phone-auth', {
      phone: this.phoneNumber
    }, { withCredentials: true })
      .subscribe((res: any) => {

        this.loading = false;

        if (res.isNewUser) {
          this.step.set('details');
          this.startResendTimer();
        } else {
          this.store.dispatch(AuthActions.loadUser());
          Promise.resolve().then(() => {
            // this.router.navigate(['/']);
            console.log("sdadas")
            this.closeAuth.emit()
          });
        }
      });
  }

  onPhoneChange(value: string) {
    // Remove non-numbers
    let cleaned = value.replace(/\D/g, '');

    // Limit to 10 digits
    if (cleaned.length > 10) {
      cleaned = cleaned.slice(0, 10);
    }

    this.phoneNumber = cleaned;
  }

  get isPhoneValid(): boolean {
    return this.phoneNumber.length === 10;
  }

  onOtpInput(event: Event, index: number) {
    const input = event.target as HTMLInputElement;
    const value = input.value.replace(/\D/g, '');
    if (!value) return;
    this.otpValues[index] = value;
    const next = this.otpInputs.get(index + 1);
    if (next) next.nativeElement.focus();
  }

  onOtpKeydown(event: KeyboardEvent, index: number) {
    if (event.key === 'Backspace') {
      if (!this.otpValues[index]) {
        const prev = this.otpInputs.get(index - 1);
        if (prev) prev.nativeElement.focus();
      }
      if (index - 1 >= 0)
        this.otpValues[index - 1] = ''
    }
  }

  ngOnDestroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }
}
