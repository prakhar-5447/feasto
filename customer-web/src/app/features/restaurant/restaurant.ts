import {
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  inject,
  signal
} from '@angular/core';

import {
  ActivatedRoute,
  Router,
  RouterLink,
  RouterOutlet
} from '@angular/router';

import { HttpClient } from '@angular/common/http';

import {
  takeUntilDestroyed
} from '@angular/core/rxjs-interop';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import {
  faArrowLeft
} from '@fortawesome/free-solid-svg-icons';

import { CartService } from '../../core/services/cart.service';

import { ImageCarousel } from './image-carousel/image-carousel';
import { RestaurantInfo } from './restaurant-info/restaurant-info';

import { RestaurantDetail } from '../../core/restaurant/models/restaurant.model';


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

  private readonly router =
    inject(Router);

  private readonly route =
    inject(ActivatedRoute);

  private readonly http =
    inject(HttpClient);

  private readonly destroyRef =
    inject(DestroyRef);


  readonly cartService =
    inject(CartService);


  readonly faArrowLeft =
    faArrowLeft;


  readonly loading =
    signal(true);

  readonly error =
    signal<string | null>(null);


  readonly activeTab =
    signal('order');


  // Restaurant page owns the restaurant data
  readonly restaurant =
    signal<RestaurantDetail | null>(null);


  ngOnInit(): void {

    this.setActiveTab();

    this.loadRestaurant();

  }


  private loadRestaurant(): void {

    this.route.paramMap
      .pipe(
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe(params => {

        const slug =
          params.get('restaurant');

        if (!slug) {

          this.router.navigate(['/']);

          return;

        }

        this.fetchRestaurant(slug);

      });

  }

  private fetchRestaurant(
    slug: string
  ): void {

    this.loading.set(true);
    this.error.set(null);

    this.http
      .get<{ data: RestaurantDetail }>(
        `/api/v1/restaurants/slug/${slug}`
      )
      .pipe(
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe({

        next: ({ data }) => {

          this.restaurant.set(data);

          this.loading.set(false);

        },

        error: error => {

          console.error(
            'Failed to load restaurant:',
            error
          );

          this.error.set(
            'Unable to load restaurant.'
          );

          this.loading.set(false);

        }

      });

  }


  private setActiveTab(): void {

    const child =
      this.route.firstChild;

    const tab =
      child?.snapshot.routeConfig?.path;

    if (tab) {

      this.activeTab.set(tab);

    }

  }


  showCarousel(): boolean {

    return this.activeTab() === 'order';

  }


  setTab(tab: string): void {

    this.activeTab.set(tab);

  }


  get cartCount(): number {

    return this.cartService.cartCount();

  }

}