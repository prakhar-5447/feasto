import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject
} from '@angular/core';

import { FormsModule } from '@angular/forms';

import {
  HttpClient
} from '@angular/common/http';

import {
  finalize
} from 'rxjs';

import {
  Router
} from '@angular/router';

import {
  takeUntilDestroyed
} from '@angular/core/rxjs-interop';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import {
  faLocationDot,
  faPlus,
  faTag
} from '@fortawesome/free-solid-svg-icons';

import { Button } from '../../shared/components/button/button';
import { Input } from '../../shared/components/input/input';

import { CartService } from '../../core/services/cart.service';
import { LocationServicePersistence } from '../../core/services/location.service';
import { RestaurantService } from '../../core/services/restaurant.service';


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


interface CartItem {
  name: string;
  quantity: number;
  price: number;
  food: {
    _id: string;
  };
}


interface Coupon {
  code: string;
  description: string;
}


interface OrderSummary {
  itemTotal: number;
  discount: number;
  deliveryFee: number;
  platformFee: number;
  gst: number;
  gstRate: number;
  grandTotal: number;
  coupon?: Coupon;
}


interface CartSummaryResponse {
  data: OrderSummary;
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
    Input
  ],
  templateUrl: './checkout.html',
  styleUrl: './checkout.sass',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Checkout {

  readonly faPlus = faPlus;
  readonly faTag = faTag;
  readonly faLocationDot = faLocationDot;

  readonly cart: CartItem[] = [];

  summary: OrderSummary = {
    itemTotal: 0,
    discount: 0,
    deliveryFee: 0,
    platformFee: 0,
    gst: 0,
    gstRate: 0,
    grandTotal: 0
  };

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

  readonly restaurantService =
    inject(RestaurantService);

  private readonly locationService =
    inject(LocationServicePersistence);

  private readonly http =
    inject(HttpClient);

  private readonly router =
    inject(Router);

  private readonly destroyRef =
    inject(DestroyRef);


  ngOnInit(): void {
    this.loadSummary();
  }


  get appliedCoupon(): Coupon | undefined {
    return this.summary.coupon;
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
      !!this.restaurantService.restaurant &&
      !this.placingOrder
    );
  }


  private loadSummary(): void {

    this.cartService
      .getCartSummary()
      .pipe(
        takeUntilDestroyed(
          this.destroyRef
        )
      )
      .subscribe({
        next: (response: any) => {
          this.summary = response.data;
        },

        error: () => {
          this.summary = {
            itemTotal: 0,
            discount: 0,
            deliveryFee: 0,
            platformFee: 0,
            gst: 0,
            gstRate: 0,
            grandTotal: 0
          };
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

    const restaurant =
      this.restaurantService.restaurant;

    if (!restaurant) {
      return;
    }

    this.placingOrder = true;

    this.http
      .post<CreateOrderResponse>(
        '/api/v1/orders',
        {
          restaurantId: restaurant._id,

          paymentMethod:
            this.paymentMethod,

          deliveryAddress: {
            street:
              this.address.street.trim(),

            landmark:
              this.address.landmark.trim(),

            city:
              this.address.city.trim(),

            pincode:
              this.address.pincode
          }
        }
      )
      .pipe(
        finalize(() => {
          this.placingOrder = false;
        }),
        takeUntilDestroyed(
          this.destroyRef
        )
      )
      .subscribe({
        next: response => {

          const city =
            this.locationService
              .getCity();

          this.router.navigate(
            ['/india', 'r',
              restaurant.slug,
              'payment'
            ],
            {
              queryParams: {
                city,
                orderId:
                  response.data._id
              }
            }
          );
        }
      });
  }
}