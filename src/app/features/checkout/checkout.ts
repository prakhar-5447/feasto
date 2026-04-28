import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RestaurantService } from '../../core/services/restaurent.service';
import { CartService } from '../../core/services/cart.service';
import { LocationServicePersistence } from '../../core/services/location.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faTrashCan
} from '@fortawesome/free-regular-svg-icons';
import {
  faMinus, faPlus, faTag
} from '@fortawesome/free-solid-svg-icons';

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
  imports: [FormsModule, FontAwesomeModule],
  templateUrl: './checkout.html',
  styleUrl: './checkout.sass',
})
export class Checkout {
  faTrashCan = faTrashCan
  deliveryFee = 40;
  platformFee = 5;
  faMinus = faMinus
  faPlus = faPlus
  faTag = faTag
  gstPrecentage = 0.05

  constructor(
    public cartService: CartService,
    public restaurantService: RestaurantService,
    public locationService: LocationServicePersistence,
    private router: Router
  ) { }

  get cart() {
    return this.restaurantService.cart;
  }

  getTotal() {
    return this.cartService.getTotal();
  }

  getDiscount() {
    return this.cartService.getDiscount(); // implement in service
  }

  getItemCount() {
    return this.cartService.getItemCount();
  }
  // 🔥 Replace existing getters
  get itemTotal() {
    return this.getTotal();
  }

  get discount() {
    return this.getDiscount();
  }

  get gst() {
    return Math.round((this.itemTotal - this.discount) * this.gstPrecentage);
  }

  get finalTotal() {
    return this.itemTotal + this.deliveryFee + this.platformFee + this.gst - this.discount;
  }

  updateQuantity(itemId: string, qty: number) {
    this.cartService.updateQuantity(itemId, qty);
  }

  removeItem(itemId: string) {
    this.cartService.removeFromCart(itemId);
  }

  goBack() {
    this.router.navigate(['/india']);
  }
  formatSlug(name: string) {
    return name.
      toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^\w-]+/g, '')
  }
  checkout() {
    this.router.navigate(['/india', this.locationService.getCity(), this.formatSlug(this.restaurantService.restaurant.name), 'checkout'
    ]);
  }
  // appliedCoupon: any = null;

  // paymentMethod = 'online';
  // selectedPaymentOption = 'upi';

  // selectedAddressId: string | null = null;
  // showNewAddressForm = false;
  // saveAddress = false;

  // address = {
  //   street: '',
  //   landmark: '',
  //   city: '',
  //   pincode: ''
  // };

  // processing = false;
  // showQRModal = false;
  // countdown = 10;

  // orderId = '';
  // showOrderSuccess = false;

  // deliveryFee = 40;
  // platformFee = 5;

  // savedAddresses: Address[] = [
  //   {
  //     id: '1',
  //     label: 'Home',
  //     street: '123, Park Avenue',
  //     landmark: 'Near Central Park',
  //     city: 'Mumbai',
  //     pincode: '400001',
  //   },
  //   {
  //     id: '2',
  //     label: 'Work',
  //     street: '45, Corporate Plaza',
  //     landmark: 'Opposite Tech Hub',
  //     city: 'Mumbai',
  //     pincode: '400051',
  //   }
  // ];

  // constructor(private router: Router, private restaurantService: RestaurantService) {
  // }

  // get cart() {
  //   return this.restaurantService.cart;
  // }

  // get itemTotal() {
  //   return this.cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  // }

  // get discount() {
  //   return 0;
  // }

  // get gst() {
  //   return Math.round((this.itemTotal - this.discount) * 0.05);
  // }

  // get total() {
  //   return this.itemTotal + this.deliveryFee + this.platformFee + this.gst - this.discount;
  // }

  // selectAddress(id: string) {
  //   this.selectedAddressId = id;
  //   this.showNewAddressForm = false;

  //   const selected = this.savedAddresses.find(a => a.id === id);
  //   if (selected) {
  //     this.address = { ...selected };
  //   }
  // }

  // newAddress() {
  //   this.selectedAddressId = null;
  //   this.showNewAddressForm = true;

  //   this.address = {
  //     street: '',
  //     landmark: '',
  //     city: '',
  //     pincode: ''
  //   };
  // }

  // placeOrder() {
  //   if (!this.address.street || !this.address.city || !this.address.pincode) {
  //     alert('Please fill address');
  //     return;
  //   }

  //   this.processing = true;

  //   setTimeout(() => {
  //     this.processing = false;

  //     if (this.paymentMethod === 'online') {
  //       this.countdown = 10;
  //       this.showQRModal = true;
  //       this.startTimer();
  //     } else {
  //       this.successOrder();
  //     }
  //   }, 1000);
  // }

  // startTimer() {
  //   const interval = setInterval(() => {
  //     this.countdown--;

  //     if (this.countdown === 0) {
  //       clearInterval(interval);
  //       this.successOrder();
  //     }
  //   }, 1000);
  // }

  // successOrder() {
  //   this.orderId = 'FO' + Date.now().toString().slice(-8);
  //   this.showQRModal = false;
  //   this.showOrderSuccess = true;
  // }
}
