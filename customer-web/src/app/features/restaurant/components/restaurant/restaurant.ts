import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  signal
} from '@angular/core';

import {
  ActivatedRoute,
  RouterLink,
  RouterOutlet
} from '@angular/router';

import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

import { AppState } from '@/app/store/app.state';
import { Store } from '@ngrx/store';
import { selectCartCount, selectCartStatus } from '@/app/store/cart/cart.selectors';

import { ImageCarousel } from '@/app/features/restaurant/components/image-carousel/image-carousel';
import { RestaurantInfo } from '@/app/features/restaurant/components/restaurant-info/restaurant-info';
import { RestaurantDetail } from '@/app/features/restaurant/models/restaurant.model';


type RestaurantTab = 'order' | 'reviews' | 'cart';

@Component({
  selector: 'app-restaurant',
  standalone: true,
  imports: [
    RouterLink,
    RouterOutlet,
    FontAwesomeModule,
    ImageCarousel,
    RestaurantInfo
  ],
  templateUrl: './restaurant.html',
  styleUrl: './restaurant.sass',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Restaurant {

  private readonly route = inject(ActivatedRoute);

  readonly faArrowLeft = faArrowLeft;

  private readonly store = inject(Store<AppState>);
  readonly itemCount = this.store.selectSignal(selectCartCount);

  readonly cartStatus = this.store.selectSignal(selectCartStatus);

  readonly showCartCountSkeleton = computed(
    () => this.cartStatus() === 'loading'
  );

  readonly restaurant = toSignal(
    this.route.data.pipe(
      map(data => data['restaurant'] as RestaurantDetail)
    ),
    { initialValue: null }
  );

  readonly activeTab = signal<RestaurantTab>('order');

  showCarousel(): boolean {
    return this.activeTab() === 'order';
  }

  setTab(tab: RestaurantTab): void {
    this.activeTab.set(tab);
  }
}