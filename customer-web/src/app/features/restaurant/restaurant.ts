import { ChangeDetectorRef, Component } from '@angular/core';
import { signal } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterLink, RouterOutlet } from '@angular/router';
import { CartService } from '../../core/services/cart.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faArrowLeft
} from '@fortawesome/free-solid-svg-icons';
import { ImageCarousel } from './image-carousel/image-carousel';
import { RestaurantInfo } from './restaurant-info/restaurant-info';
import { RestaurantService } from '../../core/services/restaurant.service';
import { LocationServicePersistence } from '../../core/services/location.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-restaurant',
  standalone: true,
  imports: [RouterLink, RouterOutlet, FontAwesomeModule, ImageCarousel, RestaurantInfo],
  templateUrl: './restaurant.html',
  styleUrl: './restaurant.sass',
})
export class Restaurant {
  faArrowLeft = faArrowLeft;
  restaurant = signal<any>(null);
  id!: string;
  menu: any;
  reviews: any[] = [];
  activeTab: string = 'order';

  constructor(
    private router: Router,
    private http: HttpClient,
    private route: ActivatedRoute,
    public cartService: CartService,
    private cdr: ChangeDetectorRef,
    public restaurantService: RestaurantService,
    public locationServicePersistence: LocationServicePersistence,
  ) { }

  showCarousel() {
    return this.router.url.includes('/order')
  }

  ngOnInit() {
    this.activeTab = this.route.firstChild?.snapshot.routeConfig?.path || 'order'
    // this.id = this.route.snapshot.paramMap.get('id')!;
    // this.restaurant = this.restaurants.find((r) => r.id === this.id);
    // this.restaurantService.restaurant = this.restaurant
    // this.menu = this.restaurantMenus[this.id];
    // this.restaurantService.menu = this.menu
    // this.reviews = this.restaurantReviews[this.id] || [];
    // this.restaurantService.reviews = this.reviews

    this.route.paramMap.subscribe(params => {
      const slug = params.get("restaurant");

      if (!slug) {
        this.router.navigate(["/"]);
        return;
      }

      this.http.get(
        `/api/v1/restaurants/slug/${slug}`
      ).subscribe({
        next: (res: any) => {
          this.restaurantService.restaurant = res.data;
          this.restaurant = res.data;
          this.cdr.detectChanges();
          this.id = res.data._id;
        },
        error: () => {
          this.router.navigate(["/"]);
        }
      });
    });
  }

  get getCartCount() {
  return this.cartService.cartCount();
}

  setTab(tab: string) {
    this.activeTab = tab;
  }
}
