import {
  Component,
  DestroyRef,
  PLATFORM_ID,
  inject
} from '@angular/core';

import { isPlatformBrowser } from '@angular/common';

import {
  RouterOutlet
} from '@angular/router';

import { Store } from '@ngrx/store';

import { AppState } from './store/app.state';
import * as AuthActions from './store/auth/auth.actions';
import * as LocationActions from './store/location/location.actions';
import * as CartActions from './store/cart/cart.actions';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.sass'
})
export class App {

  private readonly store =
    inject(Store<AppState>);

  private readonly platformId =
    inject(PLATFORM_ID);

  private readonly destroyRef =
    inject(DestroyRef);


  ngOnInit(): void {

    if (isPlatformBrowser(this.platformId)) {

      this.store.dispatch(
        AuthActions.loadUser()
      );

      this.store.dispatch(
        LocationActions.loadSavedLocation()
      );

      this.store.dispatch(CartActions.loadCart());
    }
  }
}