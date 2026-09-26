import {
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  inject,
  signal
} from '@angular/core';

import { FormsModule } from '@angular/forms';

import {
  HttpClient
} from '@angular/common/http';

import {
  delay,
  finalize,
} from 'rxjs';

import {
  ActivatedRoute,
  Router
} from '@angular/router';

import {
  takeUntilDestroyed,
} from '@angular/core/rxjs-interop';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import {
  faLocationDot,
  faPlus,
  faTag
} from '@fortawesome/free-solid-svg-icons';

import { Button } from '../../shared/components/button/button';
import { Input } from '../../shared/components/input/input';

import { CartService } from '../../core/cart/services/cart.service';
import { Coupon } from '../../core/cart/models/coupon.model';
import { CartSummary } from '../../core/cart/models/cart.model';
import { selectSelectedLocation } from '../../store/location/location.selectors';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.state';
import { selectCartItems } from '../../store/cart/cart.selectors';
import { TitleCasePipe } from '../../shared/pipes/title-case.pipe';


interface Address {
  id: string;
  label: string;
  street: string;
  landmark: string;
  city: string;
  pincode: string;
}


interface NewAddress {
  street: string;
  landmark: string;
  city: string;
  pincode: string;

}

interface CreateOrderResponse {
  data: {
    _id: string;
  };
}


@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [
    FormsModule,
    FontAwesomeModule,
    Button,
    Input,
    TitleCasePipe
  ],
  templateUrl: './checkout.html',
  styleUrl: './checkout.sass',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Checkout {

  readonly faPlus = faPlus;
  readonly faTag = faTag;
  readonly faLocationDot = faLocationDot;

  private readonly store =
    inject(Store<AppState>);

  readonly cart =
    this.store.selectSignal(
      selectCartItems
    );

  private readonly route = inject(ActivatedRoute);

  readonly restaurant = computed(() => {
    const slug = this.route.snapshot.paramMap.get('restaurant');

    if (!slug) {
      return null;
    }

    const id = slug.substring(slug.lastIndexOf('-') + 1);
    const name = slug.substring(0, slug.lastIndexOf('-'));

    return {
      _id: id,
      name: name
    };
  });

  readonly summary = signal<CartSummary>({
    itemTotal: 0,
    discount: 0,
    deliveryFee: 0,
    platformFee: 0,
    gst: 0,
    gstRate: 0,
    grandTotal: 0
  });

  paymentMethod: 'online' | 'cod' | '' = '';

  selectedAddressId: string | null = null;

  showNewAddressForm = false;
  saveAddress = false;

  savingAddress = false;
  placingOrder = false;

  address: NewAddress = {
    street: '',
    landmark: '',
    city: '',
    pincode: ''
  };


  readonly savedAddresses: Address[] = [
    {
      id: '1',
      label: 'Home',
      street: '123 Park Avenue',
      landmark: 'Near Central Park',
      city: 'Mumbai',
      pincode: '400001'
    }
  ];


  private readonly cartService =
    inject(CartService);

  selectedLocation = this.store.selectSignal(
    selectSelectedLocation
  );

  private readonly http =
    inject(HttpClient);

  private readonly router =
    inject(Router);

  private readonly destroyRef =
    inject(DestroyRef);

  readonly loading = signal(true);

  ngOnInit(): void {
    this.loadSummary();
  }


  get appliedCoupon(): Coupon | undefined {
    return this.summary().coupon;
  }


  get isAddressValid(): boolean {

    return (
      this.address.street.trim().length > 0 &&
      this.address.city.trim().length > 0 &&
      /^\d{6}$/.test(
        this.address.pincode
      )
    );
  }


  get canPlaceOrder(): boolean {

    return (
      this.isAddressValid &&
      !!this.paymentMethod &&
      !this.placingOrder
    );
  }

  private loadSummary(): void {
    this.loading.set(true);

    this.cartService
      .getCartSummary()
      .pipe(
        delay(5000),
        takeUntilDestroyed(this.destroyRef),
        finalize(() => {
          this.loading.set(false);
        })
      )
      .subscribe({
        next: response => {
          this.summary.set(response.data);
        },

        error: () => {
          this.summary.set({
            itemTotal: 0,
            discount: 0,
            deliveryFee: 0,
            platformFee: 0,
            gst: 0,
            gstRate: 0,
            grandTotal: 0
          });
        }
      });
  }


  selectAddress(id: string): void {

    this.selectedAddressId = id;
    this.showNewAddressForm = false;

    const selected =
      this.savedAddresses.find(
        address => address.id === id
      );

    if (!selected) {
      return;
    }

    this.address = {
      street: selected.street,
      landmark: selected.landmark,
      city: selected.city,
      pincode: selected.pincode
    };
  }


  newAddress(): void {

    this.selectedAddressId = null;
    this.showNewAddressForm = true;

    this.address = {
      street: '',
      landmark: '',
      city: '',
      pincode: ''
    };
  }


  saveNewAddress(): void {

    if (!this.isAddressValid) {
      return;
    }

    // Replace with your address API later.
    this.selectedAddressId = null;
    this.showNewAddressForm = false;
  }


  placeOrder(): void {
    if (!this.canPlaceOrder) {
      return;
    }

    const restaurant = this.restaurant();

    if (!restaurant) {
      return;
    }

    const location = this.selectedLocation();

    if (!location) {
      return;
    }

    this.placingOrder = true;

    const fullAddress = [
      this.address.street.trim(),
      this.address.landmark.trim(),
      this.address.city.trim(),
      this.address.pincode
    ]
      .filter(Boolean)
      .join(', ');

    this.http
      .post<CreateOrderResponse>(
        '/api/v1/orders',
        {
          restaurantId: restaurant._id,

          paymentMethod: this.paymentMethod,

          deliveryAddress: {
            fullAddress,
            lat: location.latitude,
            lng: location.longitude
          }
        }
      )
      .pipe(
        finalize(() => {
          this.placingOrder = false;
        }),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe({
        next: response => {
          const city = location.city;

          this.router.navigate(
            ['../payment'],
            {
              queryParams: {
                city,
                orderId: response.data._id
              }
            }
          );
        }
      });
  }
}