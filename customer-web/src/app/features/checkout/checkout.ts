import { ChangeDetectorRef, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RestaurantService } from '../../core/services/restaurant.service';
import { CartService } from '../../core/services/cart.service';
import { LocationServicePersistence } from '../../core/services/location.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import {
  faTrashCan
} from '@fortawesome/free-regular-svg-icons';

import {
  faMinus,
  faPlus,
  faTag,
  faLocationDot
} from '@fortawesome/free-solid-svg-icons';
import { HttpClient } from '@angular/common/http';

interface Address {
  id: string;
  label: string;
  street: string;
  landmark: string;
  city: string;
  pincode: string;
}

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [
    FormsModule,
    FontAwesomeModule
  ],
  templateUrl: './checkout.html',
  styleUrl: './checkout.sass'
})
export class Checkout {

  faTrashCan = faTrashCan;
  faMinus = faMinus;
  faPlus = faPlus;
  faTag = faTag;
  faLocationDot = faLocationDot;

  cart: any[] = [];

  summary: any = {
    itemTotal: 0,
    discount: 0,
    deliveryFee: 0,
    platformFee: 0,
    gst: 0,
    gstRate: 0,
    grandTotal: 0
  };

  paymentMethod = '';

  selectedAddressId: string | null = null;

  showNewAddressForm = false;

  saveAddress = false;

  address = {
    street: '',
    landmark: '',
    city: '',
    pincode: ''
  };

  constructor(
    public cartService: CartService,
    public restaurantService: RestaurantService,
    public locationService: LocationServicePersistence,
    private cdr: ChangeDetectorRef,
    private router: Router,
    private http: HttpClient
  ) { }

  ngOnInit() {
    this.loadSummary();
  }

  loadSummary() {
    this.cartService
      .getCartSummary()
      .subscribe({
        next: (res: any) => {
          this.summary = res.data;
          this.cdr.detectChanges()
        }
      });
  }

  get appliedCoupon() {
    return this.summary?.coupon;
  }

  savedAddresses: Address[] = [
    {
      id: '1',
      label: 'Home',
      street: '123 Park Avenue',
      landmark: 'Near Central Park',
      city: 'Mumbai',
      pincode: '400001'
    }
  ];

  selectAddress(id: string) {

    this.selectedAddressId = id;

    const selected =
      this.savedAddresses.find(
        a => a.id === id
      );

    if (selected) {

      this.address = {
        street: selected.street,
        landmark: selected.landmark,
        city: selected.city,
        pincode: selected.pincode
      };
    }

    this.showNewAddressForm = false;
  }

  newAddress() {

    this.selectedAddressId = null;

    this.showNewAddressForm = true;

    this.address = {
      street: '',
      landmark: '',
      city: '',
      pincode: ''
    };
  }

  payment() {

    if (
      !this.address.street ||
      !this.address.city ||
      !this.address.pincode
    ) {
      alert('Please select delivery address');
      return;
    }

    if (!this.paymentMethod) {
      alert('Please select payment method');
      return;
    }

    this.http.post(
      '/api/v1/orders',
      {
        deliveryAddress: {
          fullAddress:
            `${this.address.street}, ${this.address.landmark}, ${this.address.city} - ${this.address.pincode}`,
          lat: null,
          lng: null
        }
      }
    ).subscribe({
      next: (res: any) => {
        this.router.navigate([
          '/india',
          this.locationService.getCity(),
          'r',
          this.restaurantService.restaurant.slug,
          'payment'
        ], {
          queryParams: {
            orderId: res.data._id
          }
        });
      }
    });
  }
}