import { Component, signal, Inject, PLATFORM_ID } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LocationServicePersistence } from './core/services/location.service';
import { Store } from '@ngrx/store';
import { isPlatformBrowser } from '@angular/common';
import * as AuthActions from './store/auth/auth.actions';
import { AppState } from './store/app.state';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  standalone: true,
  styleUrl: './app.sass'
})
export class App {
  protected readonly title = signal('customer-web');
  constructor(private locationService: LocationServicePersistence, @Inject(Store) private store: Store<AppState>, @Inject(PLATFORM_ID) private platformId: Object
  ) {
    // 🔥 ONLY RUN IN BROWSER
    if (isPlatformBrowser(this.platformId)) {

      this.store.dispatch(AuthActions.loadUser());
    }
  }

  ngOnInit() {
    this.locationService.loadInitialCity()
  }
}
