import {
  Component, OnInit,
  OnDestroy
} from '@angular/core';
import { Router } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faShieldAlt,faCheckCircle,faMotorcycle,faShoppingBasket,faLocationDot,faAngleRight,faClock
} from '@fortawesome/free-solid-svg-icons';

export type PaymentStage =
  | 'qr'
  | 'processing'
  | 'confirmed';

export interface OrderItem {
  name: string;
  quantity: number;
  price: number;
}

export interface OrderMeta {
  total: number;
  itemTotal: number;
  discount: number;
  deliveryFee: number;
  platformFee: number;
  gst: number;
  address: string;
  restaurantName: string;
  items: OrderItem[];
  couponCode?: string;
}


@Component({
  selector: 'app-payment',
  imports: [FontAwesomeModule],
  templateUrl: './payment.html',
  styleUrl: './payment.sass',
})
export class Payment {

  faShieldAlt = faShieldAlt;
  faMotorcycle = faMotorcycle;
  faCheckCircle = faCheckCircle;
  faClock = faClock;
  faLocationDot = faLocationDot;
  faShoppingBasket = faShoppingBasket;
  faAngleRight = faAngleRight;

  readonly QR_SIZE = 21;
  readonly QR_EXPIRY_SECS = 300;
  readonly AUTO_SCAN_SECS = 10;

  stage: PaymentStage = 'confirmed';

  meta: OrderMeta = {
    total: 540,
    itemTotal: 460,
    discount: 20,
    deliveryFee: 40,
    platformFee: 5,
    gst: 55,
    address: '123 Park Avenue, Mumbai',
    restaurantName: 'Burger House',
    couponCode: 'SAVE20',
    items: [
      {
        name: 'Cheese Burger',
        quantity: 2,
        price: 160
      },
      {
        name: 'French Fries',
        quantity: 1,
        price: 80
      },
      {
        name: 'Cold Coffee',
        quantity: 1,
        price: 60
      }
    ]
  };

  qrSize = this.QR_SIZE;
  qrCells: boolean[] = [];
  upiApps = [
    'GPay',
    'PhonePe',
    'Paytm',
    'BHIM'
  ];

  upiId = 'feasto@upi';
  copied = false;
  expiry = this.QR_EXPIRY_SECS;
  autoScan = this.AUTO_SCAN_SECS;
  processingDot = 0;

  orderId =
    'FEA' +
    Date.now().toString().slice(-8);
  estimatedTime = '';

  processingSteps = [
    {
      label: 'Payment received',
      done: true
    },
    {
      label: 'Confirming with bank',
      done: false
    },
    {
      label: 'Placing your order',
      done: false
    }
  ];

  deliverySteps = [
    'Order Placed',
    'Preparing',
    'Out for Delivery',
    'Delivered'
  ];

  private expiryInterval?: any;
  private autoScanTimer?: any;
  private processingTimer?: any;
  private dotsInterval?: any;

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
    this.generateQR();
    const delivery = new Date();
    delivery.setMinutes(
      delivery.getMinutes() + 35
    );
    this.estimatedTime =
      delivery.toLocaleTimeString(
        'en-IN',
        {
          hour: '2-digit',
          minute: '2-digit'
        }
      );

    // this.startExpiryCountdown();

    // this.startAutoScan();

  }

  private generateQR(): void {
    const seed = [
      1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 0, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1,
      1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1,
      1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 1, 0, 0, 1, 0, 1, 1, 1, 0, 1,
      1, 0, 1, 1, 1, 0, 1, 0, 0, 0, 0, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1,
      1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 0, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1,
      1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 1,
      1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1,
      0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 0, 1, 0, 0, 1, 0, 1, 1,
      0, 0, 1, 0, 0, 1, 0, 0, 1, 1, 0, 0, 0, 1, 0, 1, 0, 0, 1, 0, 0,
      1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 1, 0, 0, 0, 1, 0, 1, 1, 0,
      0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0, 0, 1,
      1, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 0, 1, 0, 0, 1, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1, 1, 0,
      1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 0, 1, 1, 0, 1, 0, 1, 0, 0, 1,
      1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0,
      1, 0, 1, 1, 1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 1, 1, 0, 1, 1, 0, 1,
      1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0,
      1, 0, 1, 1, 1, 0, 1, 0, 0, 0, 1, 1, 0, 0, 1, 0, 1, 0, 1, 0, 0,
      1, 0, 0, 0, 0, 0, 1, 0, 1, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 1,
      1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 1, 0
    ];
    this.qrCells = seed.map(
      value => value === 1
    );
  }

  private startExpiryCountdown(): void {
    this.expiryInterval = setInterval(() => {
      if (this.stage !== 'qr') {
        return;
      }
      if (this.expiry > 0) {
        this.expiry--;
      }
    }, 1000);
  }

  private startAutoScan(): void {
    this.autoScanTimer = setInterval(() => {
      if (this.stage !== 'qr') {
        return;
      }
      if (this.autoScan > 0) {
        this.autoScan--;
      } else {
        clearInterval(this.autoScanTimer);
        this.stage = 'processing';
        this.startProcessing();
      }
    }, 1000);
  }

  private startProcessing(): void {
    this.processingSteps[0].done = true;
    this.processingSteps[1].done = false;
    this.processingSteps[2].done = false;
    this.dotsInterval = setInterval(() => {
      this.processingDot =
        (this.processingDot + 1) % 4;
      if (this.processingDot >= 2) {
        this.processingSteps[1].done = true;
      }
    }, 500);
    this.processingTimer = setTimeout(() => {
      clearInterval(this.dotsInterval);
      this.processingSteps[2].done = true;
      this.stage = 'confirmed';
    }, 5000);
  }

  copyUPI(): void {
    navigator.clipboard
      .writeText(this.upiId)
      .then(() => {
        this.copied = true;
        setTimeout(() => {
          this.copied = false;
        }, 2000);
      });
  }


  goHome(): void {
    this.router.navigate([
      '/dashboard'
    ]);
  }

  get expiryMinutes(): string {
    return Math.floor(
      this.expiry / 60
    )
      .toString()
      .padStart(2, '0');
  }

  get expirySeconds(): string {
    return (this.expiry % 60)
      .toString()
      .padStart(2, '0');
  }

  get processingDots(): string {
    return '.'.repeat(
      this.processingDot
    );
  }

  get progressOffset(): number {
    const radius = 50;
    const circumference =
      2 * Math.PI * radius;
    const progress =
      (this.AUTO_SCAN_SECS - this.autoScan) /
      this.AUTO_SCAN_SECS;
    return circumference * (1 - progress);
  }

  ngOnDestroy(): void {
    if (this.expiryInterval) {
      clearInterval(
        this.expiryInterval
      );
    }
    if (this.autoScanTimer) {
      clearInterval(
        this.autoScanTimer
      );
    }
    if (this.processingTimer) {
      clearTimeout(
        this.processingTimer
      );
    }
    if (this.dotsInterval) {
      clearInterval(
        this.dotsInterval
      );
    }
  }
}
