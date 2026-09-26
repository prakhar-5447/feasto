import { Component, DestroyRef, ElementRef, EventEmitter, Output, QueryList, ViewChildren, inject, signal } from '@angular/core';

import { FormsModule } from '@angular/forms';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { faMobileScreen, faXmark } from '@fortawesome/free-solid-svg-icons';

import { Observable, finalize, interval, map, take, } from 'rxjs';

import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { Router } from '@angular/router';

import { Store } from '@ngrx/store';

import * as AuthActions from '@/app/store/auth/auth.actions';
import { AppState } from '@/app/store/app.state';
import { selectUser } from '@/app/store/auth/auth.selectors';

import { Input } from '@/app/shared/components/input/input';
import { Button } from '@/app/shared/components/button/button';
import { AuthService } from '@/app/features/auth/services/auth.service';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [FormsModule, FontAwesomeModule, Button, Input],
  templateUrl: './auth.html',
  styleUrl: './auth.sass'
})
export class Auth {

  @Output() readonly closeAuth = new EventEmitter<void>();

  readonly faMobileScreen = faMobileScreen;
  readonly faXmark = faXmark;

  readonly step = signal<AuthStep>('phone');

  readonly timer = signal(30);

  readonly resendDisabled = signal(true);

  readonly otpArray = [0, 1, 2, 3, 4, 5];

  private readonly store = inject(Store<AppState>);

  readonly user$: Observable<unknown> = this.store.select(selectUser);

  phoneNumber = '';
  name = '';
  email = '';
  signupToken = '';
  loading = false;

  otpValues: string[] = ['', '', '', '', '', ''];

  @ViewChildren('otpInput')
  otpInputs!: QueryList<ElementRef<HTMLInputElement>>;

  private readonly router = inject(Router);
  private readonly authService = inject(AuthService);
  private readonly destroyRef = inject(DestroyRef);


  get otp(): string {
    return this.otpValues.join('');
  }


  get isPhoneValid(): boolean {
    return /^\d{10}$/.test(this.phoneNumber);
  }

  continueWithPhone(): void {

    if (!this.isPhoneValid || this.loading)
      return;

    this.loading = true;

    this.authService
      .phoneAuth(this.phoneNumber)
      .pipe(
        finalize(() => {
          this.loading = false;
        }),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe({

        next: (res) => {

          // Every user verifies OTP first.
          this.step.set('otp');

          this.otpValues = [
            '',
            '',
            '',
            '',
            '',
            ''
          ];

          this.otpValues = res.data.otp
            .toString()
            .padStart(6, '0')
            .slice(0, 6)
            .split('');

          this.startResendTimer();

          this.focusFirstOtpInput();
        },

        error: error => {

          if (error.status === 403) {
            this.closeAuth.emit();
          }

        }

      });
  }

  verifyOTP(): void {

    if (this.loading || this.otp.length !== 6)
      return;

    this.loading = true;

    this.authService
      .verifyOtp(
        this.phoneNumber,
        this.otp
      )
      .pipe(
        finalize(() => {
          this.loading = false;
        }),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe({

        next: response => {

          // -----------------------------------------
          // EXISTING USER
          // -----------------------------------------

          if (
            response.data.status === 'LOGIN_SUCCESS'
          ) {

            this.store.dispatch(
              AuthActions.loadUser()
            );

            this.closeAuth.emit();

            return;
          }

          // -----------------------------------------
          // NEW USER
          // -----------------------------------------

          if (
            response.data.status === 'PROFILE_REQUIRED'
          ) {

            this.signupToken =
              response.data.signupToken ?? '';

            this.step.set('details');

            return;
          }

        }

      });
  }

  get isNameValid(): boolean {
    const value = this.name.trim();

    return (
      value.length >= 2 &&
      value.length <= 50 &&
      /^[A-Za-zÀ-ÖØ-öø-ÿ' -]+$/.test(value)
    );
  }

  get isEmailValid(): boolean {
    const email =
      this.email
        .trim()
        .toLowerCase();

    if (!email) {
      return true;
    }

    return /^[a-z0-9._%+-]+$/.test(email);
  }
  completeSignup(): void {

    if (this.loading)
      return;

    const name = this.name.trim();

    const emailUsername = this.email
      .trim()
      .toLowerCase();

    if (!this.isNameValid || !this.isEmailValid)
      return;

    if (!this.signupToken)
      return;

    const email =
      emailUsername
        ? `${emailUsername}@gmail.com`
        : undefined;

    this.loading = true;

    this.authService
      .completeProfile(
        this.signupToken,
        name,
        email
      )
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        finalize(() => {
          this.loading = false;
        })
      )
      .subscribe({

        next: () => {

          this.signupToken = '';

          this.store.dispatch(
            AuthActions.loadUser()
          );

          this.closeAuth.emit();

        }

      });
  }
  resendOtp(): void {

    if (
      this.resendDisabled() ||
      this.loading ||
      !this.isPhoneValid
    )
      return;

    this.loading = true;

    this.authService
      .phoneAuth(this.phoneNumber)
      .pipe(
        finalize(() => {
          this.loading = false;
        }),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe({

        next: (res) => {

          this.otpValues = [
            '',
            '',
            '',
            '',
            '',
            ''
          ];

          this.otpValues = res.data.otp
            .toString()
            .padStart(6, '0')
            .slice(0, 6)
            .split('');

          this.startResendTimer();

          this.focusFirstOtpInput();

        }

      });
  }

  startResendTimer(): void {

    this.resendDisabled.set(true);
    this.timer.set(30);

    interval(1000)
      .pipe(
        take(30),
        map(second => 29 - second),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe(value => {

        this.timer.set(value);

        if (value === 0) {
          this.resendDisabled.set(false);
        }
      });
  }


  changePhone(): void {

    this.step.set('phone');

    this.otpValues = ['', '', '', '', '', ''];

    this.timer.set(30);
    this.resendDisabled.set(true);
  }

  onOtpInput(event: Event, index: number): void {

    const input =
      event.target as HTMLInputElement;

    const value = input.value.replace(/\D/g, '');

    // --------------------------------------------------
    // Paste / multiple digits
    // --------------------------------------------------

    if (value.length > 1) {

      this.fillOtpFromIndex(
        value,
        index
      );

      return;
    }

    // --------------------------------------------------
    // Empty input
    // --------------------------------------------------

    if (!value) {

      this.otpValues[index] = '';

      return;
    }

    // --------------------------------------------------
    // Normal single digit
    // --------------------------------------------------

    this.otpValues[index] = value;

    input.value = value;

    // Move to next input
    const nextInput =
      this.otpInputs.get(index + 1);

    nextInput?.nativeElement.focus();
  }


  private fillOtpFromIndex(value: string, startIndex: number): void {

    const digits =
      value
        .replace(/\D/g, '')
        .slice(0, 6 - startIndex);

    for (let i = 0; i < digits.length; i++) {

      const index =
        startIndex + i;

      this.otpValues[index] =
        digits[i];

      const input =
        this.otpInputs.get(index);

      if (input) {
        input.nativeElement.value =
          digits[i];
      }
    }

    // Focus the first empty input,
    // otherwise focus the last OTP input.
    const nextEmptyIndex =
      this.otpValues.findIndex(
        value => !value
      );

    const focusIndex = nextEmptyIndex >= 0
      ? nextEmptyIndex
      : 5;

    this.otpInputs
      .get(focusIndex)
      ?.nativeElement
      .focus();
  }


  onOtpKeydown(event: KeyboardEvent, index: number): void {

    // --------------------------------------------------
    // Backspace
    // --------------------------------------------------

    if (event.key === 'Backspace') {

      event.preventDefault();

      // Current input has a value:
      // clear it first.
      if (this.otpValues[index]) {

        this.otpValues[index] = '';

        const input =
          this.otpInputs.get(index);

        if (input) {
          input.nativeElement.value = '';
        }

        return;
      }

      // Current input is already empty:
      // move to previous and clear it.
      if (index > 0) {

        const previousIndex = index - 1;

        this.otpValues[previousIndex] = '';

        const previousInput = this.otpInputs.get(previousIndex);

        if (previousInput) {

          previousInput.nativeElement.value = '';

          previousInput.nativeElement.focus();
        }
      }

      return;
    }

    // --------------------------------------------------
    // Arrow left
    // --------------------------------------------------

    if (event.key === 'ArrowLeft') {

      event.preventDefault();

      this.otpInputs
        .get(index - 1)
        ?.nativeElement
        .focus();

      return;
    }

    // --------------------------------------------------
    // Arrow right
    // --------------------------------------------------

    if (event.key === 'ArrowRight') {

      event.preventDefault();

      this.otpInputs
        .get(index + 1)
        ?.nativeElement
        .focus();

      return;
    }

    // --------------------------------------------------
    // Allow normal typing
    // --------------------------------------------------

    if (
      event.key.length === 1 &&
      !/^\d$/.test(event.key)
    ) {

      event.preventDefault();
    }
  }

  private focusFirstOtpInput(): void {

    queueMicrotask(() => {
      this.otpInputs
        .first
        ?.nativeElement
        .focus();
    });
  }
}