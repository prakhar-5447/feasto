import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  inject,
  Output,
} from '@angular/core';

import { AsyncPipe } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

import { Store } from '@ngrx/store';

import { AppState } from '@/app/store/app.state';
import * as AuthActions from '@/app/store/auth/auth.actions';

import {
  faUser,
  faRightFromBracket,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import {
  selectAuthInitialized,
  selectUser,
} from '@/app/store/auth/auth.selectors';

import { Button } from '@/app/shared/components/button/button';

import { LocationPicker } from '@/app/features/location/components/location-picker/location-picker';

import { RestaurantPicker } from '@/app/features/restaurant/components/restaurant-picker/restaurant-picker';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    AsyncPipe,
    RouterLink,
    Button,
    LocationPicker,
    RestaurantPicker,
    FontAwesomeModule,
  ],
  templateUrl: './navbar.html',
  styleUrl: './navbar.sass',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Navbar {
  readonly faUser = faUser;
  readonly faRightFromBracket = faRightFromBracket;

  profileMenuOpen = false;

  @Output()
  readonly openAuth = new EventEmitter<void>();
  private readonly store = inject(Store<AppState>);
  private readonly router = inject(Router);

  readonly user$ =
    this.store.select(selectUser);

  readonly authInitialized$ =
    this.store.select(selectAuthInitialized);

  toggleProfileMenu(): void {
    this.profileMenuOpen = !this.profileMenuOpen;
  }

  closeProfileMenu(): void {
    this.profileMenuOpen = false;
  }

  logout(): void {
    this.store.dispatch(
      AuthActions.logout()
    );
  }

  goToProfile(): void {

    this.router.navigate([
      '/profile',
    ]);
  }
}