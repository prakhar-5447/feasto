import { HttpClient } from '@angular/common/http';

import {
  Component,
  OnInit,
  OnDestroy,
  ChangeDetectorRef,
  NgZone
} from '@angular/core';

import QRCode from 'qrcode';

import {
  ActivatedRoute,
  Router
} from '@angular/router';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import {
  faShieldAlt,
  faCheckCircle,
  faMotorcycle,
  faShoppingBasket,
  faLocationDot,
  faAngleRight,
  faClock
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

  standalone: true,

  imports: [
    FontAwesomeModule
  ],

  templateUrl: './payment.html',

  styleUrl: './payment.sass'

})
export class Payment
  implements OnInit, OnDestroy {


  // =========================================================
  // ICONS
  // =========================================================

  faShieldAlt = faShieldAlt;

  faCheckCircle = faCheckCircle;

  faMotorcycle = faMotorcycle;

  faShoppingBasket = faShoppingBasket;

  faLocationDot = faLocationDot;

  faAngleRight = faAngleRight;

  faClock = faClock;


  // =========================================================
  // CONSTANTS
  // =========================================================

  readonly QR_EXPIRY_SECS = 300;


  // =========================================================
  // PAYMENT STATE
  // =========================================================

  stage: PaymentStage = 'qr';

  qrImage: string | null = null;

  paymentId = '';

  qrTxnId = '';

  order: any = null;

  orderId = '';

  estimatedTime = '';


  // =========================================================
  // QR EXPIRY
  // =========================================================

  expiry = this.QR_EXPIRY_SECS;

  private qrExpiresAt = 0;

  private expiryInterval:
    ReturnType<typeof setInterval> | null = null;


  // =========================================================
  // PAYMENT POLLING
  // =========================================================

  private paymentPollingInterval:
    ReturnType<typeof setInterval> | null = null;


  // =========================================================
  // PROCESSING
  // =========================================================

  processingDot = 0;

  private processingTimer:
    ReturnType<typeof setTimeout> | null = null;

  private dotsInterval:
    ReturnType<typeof setInterval> | null = null;


  // =========================================================
  // UI
  // =========================================================

  copied = false;

  paymentCreating = false;

  paymentVerifying = false;

  paymentError = '';


  // =========================================================
  // META
  // =========================================================

  meta: OrderMeta = {

    total: 0,

    itemTotal: 0,

    discount: 0,

    deliveryFee: 0,

    platformFee: 0,

    gst: 0,

    address: '',

    restaurantName: '',

    items: []

  };


  // =========================================================
  // UPI
  // =========================================================

  fakePaymentUrl = '';

  upiId = 'feasto@upi';

  upiApps = [
    'GPay',
    'PhonePe',
    'Paytm',
    'BHIM'
  ];


  // =========================================================
  // PROCESSING STEPS
  // =========================================================

  processingSteps = [

    {
      label: 'Payment received',
      done: false
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


  // =========================================================
  // DELIVERY
  // =========================================================

  deliverySteps = [

    'Order Placed',

    'Preparing',

    'Out for Delivery',

    'Delivered'

  ];


  // =========================================================
  // CONSTRUCTOR
  // =========================================================

  constructor(

    private route: ActivatedRoute,

    private router: Router,

    private http: HttpClient,

    private cdr: ChangeDetectorRef,

    private zone: NgZone,
  ) { }


  // =========================================================
  // INIT
  // =========================================================

  ngOnInit(): void {

    this.route.queryParamMap.subscribe(params => {

      const orderId =
        params.get('orderId');


      if (!orderId) {

        this.router.navigate(['/']);

        return;

      }
      this.loadOrder(orderId);

    });

  }


  // =========================================================
  // LOAD ORDER
  // =========================================================

  private loadOrder(
    orderId: string
  ): void {

    this.http

      .get<any>(
        `/api/v1/orders/${orderId}`
      )

      .subscribe({

        next: (res) => {

          if (
            !res?.success ||
            !res?.data
          ) {

            this.router.navigate(['/']);

            return;

          }


          this.order =
            res.data;


          this.orderId =
            res.data._id;


          this.setOrderMeta(
            res.data
          );


          this.calculateEstimatedTime();


          // =================================================
          // ORDER ALREADY PAID
          // =================================================

          if (
            res.data.paymentStatus === 'success'
          ) {

            this.stage =
              'confirmed';

            this.clearCartAfterPayment();

            this.cdr.detectChanges();

            return;

          }


          // =================================================
          // CHECK EXISTING PAYMENT
          // =================================================

          this.loadExistingPayment();

        },


        error: (error) => {

          console.error(
            'Load order failed:',
            error
          );


          this.router.navigate(['/']);

        }

      });

  }


  // =========================================================
  // SET ORDER META
  // =========================================================

  private setOrderMeta(
    order: any
  ): void {

    this.meta = {

      total:
        order.billing?.grandTotal ?? 0,

      itemTotal:
        order.billing?.itemTotal ?? 0,

      discount:
        order.billing?.discount ?? 0,

      deliveryFee:
        order.billing?.deliveryFee ?? 0,

      platformFee:
        order.billing?.platformFee ?? 0,

      gst:
        order.billing?.gst ?? 0,

      address:
        order.deliveryAddress?.fullAddress ?? '',

      restaurantName:
        order.restaurantSnapshot?.name ?? '',

      items:
        (order.items ?? []).map(
          (item: any) => ({

            name:
              item.name,

            quantity:
              item.quantity,

            price:
              item.price

          })
        )

    };

  }


  // =========================================================
  // CHECK EXISTING PAYMENT
  // =========================================================

  private loadExistingPayment(): void {

    if (!this.order?._id) {

      this.createPayment();

      return;

    }


    this.http

      .get<any>(
        `/api/v1/payments/${this.order._id}`
      )

      .subscribe({

        next: (res) => {

          if (
            !res?.success ||
            !res?.data
          ) {

            this.createPayment();

            return;

          }


          const payment =
            res.data;


          this.paymentId =
            payment._id ?? '';


          this.qrTxnId =
            payment.transactionId ?? '';


          console.log(
            'Existing payment:',
            payment.status
          );


          // ===============================================
          // PAYMENT SUCCESS
          // ===============================================

          if (
            payment.status === 'success'
          ) {

            this.clearCartAfterPayment();

            this.stage =
              'processing';

            this.startProcessingUI();

            this.cdr.detectChanges();

            return;

          }


          // ===============================================
          // PAYMENT FAILED
          // ===============================================

          if (
            payment.status === 'failed'
          ) {

            this.paymentError =
              'Payment failed. Please generate a new QR.';

            this.stage =
              'qr';

            this.cdr.detectChanges();

            return;

          }


          // ===============================================
          // PAYMENT STILL PENDING
          // ===============================================

          if (
            payment.status === 'pending'
          ) {

            this.stage =
              'qr';

            this.startPaymentPolling();

            return;

          }


          // ===============================================
          // NO USABLE PAYMENT
          // ===============================================

          this.createPayment();

        },


        error: (error) => {

          console.error(
            'Existing payment lookup failed:',
            error
          );


          this.createPayment();

        }

      });

  }


  // =========================================================
  // FAKE UPI PAYMENT
  // =========================================================
  //
  // NO ROUTING.
  //
  // This directly verifies the current payment.
  //
  // =========================================================

  openFakePayment(): void {

    if (
      !this.paymentId ||
      this.paymentVerifying
    ) {

      return;

    }


    this.paymentVerifying = true;

    this.paymentError = '';


    const method =
      'fakeupi';


    const transactionId =
      this.qrTxnId ||
      'KEKII8FSAKN33';


    this.http

      .patch<any>(

        `/api/v1/payments/${this.paymentId}/verify` +

        `?method=${encodeURIComponent(method)}` +

        `&transactionId=${encodeURIComponent(transactionId)}`,

        {}

      )

      .subscribe({

        next: (res) => {

          this.paymentVerifying = false;


          if (
            !res?.success
          ) {

            this.paymentError =
              'Payment failed.';

            this.cdr.detectChanges();

            return;

          }


          // ===============================================
          // PAYMENT SUCCESS
          // ===============================================

          this.zone.run(() => {

            this.stopExpiryTimer();

            this.stopPaymentPolling();


            // Clear cart immediately after
            // backend confirms successful payment.

            this.clearCartAfterPayment();


            // Move UI to processing.

            this.stage =
              'processing';


            this.startProcessingUI();


            this.cdr.detectChanges();

          });

        },


        error: (error) => {

          this.paymentVerifying = false;


          console.error(
            'Payment verification failed:',
            error
          );


          this.paymentError =
            error?.error?.message ??
            'Payment failed.';


          this.cdr.detectChanges();

        }

      });

  }


  // =========================================================
  // CLEAR CART
  // =========================================================

  private clearCartAfterPayment(): void {

    /*
     * PUT YOUR CART CLEAR CODE HERE.
     *
     * Example if your CartService has:
     *
     * this.cartService.clearCart();
     *
     *
     * If your cart uses localStorage, for example:
     *
     * localStorage.removeItem('cart');
     *
     *
     * If you use sessionStorage:
     *
     * sessionStorage.removeItem('cart');
     *
     */

  }


  // =========================================================
  // ESTIMATED TIME
  // =========================================================

  private calculateEstimatedTime(): void {

    const delivery =
      new Date();


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

  }


  // =========================================================
  // CREATE PAYMENT
  // =========================================================

  private createPayment(): void {

    if (
      !this.order?._id ||
      this.paymentCreating
    ) {

      return;

    }


    this.paymentCreating = true;

    this.paymentError = '';


    this.stopExpiryTimer();

    this.stopPaymentPolling();


    this.http

      .post<any>(

        '/api/v1/payments',

        {

          orderId:
            this.order._id,

          method:
            'fakeupi'

        }

      )

      .subscribe({

        next: (res) => {

          this.paymentCreating = false;


          if (
            !res?.success ||
            !res?.data
          ) {

            this.paymentError =
              'Unable to create payment.';

            return;

          }


          const payment =
            res.data.payment;


          const providerResponse =
            res.data.providerResponse;


          if (!payment) {

            this.paymentError =
              'Payment information missing.';

            return;

          }


          if (
            !providerResponse?.qrData
          ) {

            this.paymentError =
              'QR data missing.';

            return;

          }


          this.paymentId =
            payment._id;


          this.qrTxnId =
            payment.transactionId ?? '';


          this.fakePaymentUrl =
            providerResponse.qrData;


          this.generateQR(
            providerResponse.qrData
          );


          this.stage =
            'qr';


          this.startExpiryCountdown();

          this.startPaymentPolling();

        },


        error: (error) => {

          this.paymentCreating = false;


          console.error(
            'Payment creation failed:',
            error
          );


          this.paymentError =
            error?.error?.message ??
            'Unable to create payment.';


          this.qrImage =
            null;


          this.cdr.detectChanges();

        }

      });

  }


  // =========================================================
  // GENERATE QR
  // =========================================================

  private generateQR(
    qrData: string
  ): void {

    if (!qrData) {

      return;

    }


    QRCode.toDataURL(

      qrData,

      {

        width: 300,

        margin: 2,

        errorCorrectionLevel: 'M'

      }

    )

      .then((url: any) => {

        this.zone.run(() => {

          this.qrImage =
            url;

          this.cdr.detectChanges();

        });

      })

      .catch((error: any) => {

        console.error(
          'QR generation failed:',
          error
        );


        this.zone.run(() => {

          this.paymentError =
            'Unable to generate QR code.';

          this.cdr.detectChanges();

        });

      });

  }


  // =========================================================
  // START EXPIRY
  // =========================================================

  private startExpiryCountdown(): void {

    this.stopExpiryTimer();


    this.qrExpiresAt =
      Date.now() +
      this.QR_EXPIRY_SECS * 1000;


    const update = () => {

      if (
        this.stage !== 'qr'
      ) {

        this.stopExpiryTimer();

        return;

      }


      const remaining =
        Math.max(

          0,

          Math.ceil(

            (
              this.qrExpiresAt -
              Date.now()

            ) / 1000

          )

        );


      this.zone.run(() => {

        this.expiry =
          remaining;

        this.cdr.detectChanges();

      });


      if (
        remaining <= 0
      ) {

        this.stopExpiryTimer();

        this.stopPaymentPolling();


        this.qrImage =
          null;


        this.cdr.detectChanges();


        // Generate a fresh payment.

        this.createPayment();

      }

    };


    update();


    this.expiryInterval =
      setInterval(
        update,
        250
      );

  }


  // =========================================================
  // STOP EXPIRY
  // =========================================================

  private stopExpiryTimer(): void {

    if (
      this.expiryInterval
    ) {

      clearInterval(
        this.expiryInterval
      );

      this.expiryInterval =
        null;

    }

  }


  // =========================================================
  // REGENERATE QR
  // =========================================================

  regenerateQR(): void {

    if (
      !this.order?._id
    ) {

      return;

    }


    this.stopExpiryTimer();

    this.stopPaymentPolling();

    this.stopProcessingTimers();


    this.qrImage =
      null;


    this.paymentId =
      '';


    this.qrTxnId =
      '';


    this.expiry =
      this.QR_EXPIRY_SECS;


    this.stage =
      'qr';


    this.createPayment();

  }


  // =========================================================
  // PAYMENT POLLING
  // =========================================================

  private startPaymentPolling(): void {

    this.stopPaymentPolling();


    this.paymentPollingInterval =
      setInterval(() => {

        if (
          this.stage !== 'qr'
        ) {

          return;

        }


        this.checkPaymentStatus();

      }, 2000);

  }


  // =========================================================
  // CHECK PAYMENT
  // =========================================================

  private checkPaymentStatus(): void {

    if (
      !this.order?._id
    ) {

      return;

    }


    this.http

      .get<any>(

        `/api/v1/payments/${this.order._id}`

      )

      .subscribe({

        next: (res) => {

          if (
            !res?.success ||
            !res?.data
          ) {

            return;

          }


          const payment =
            res.data;


          console.log(
            'Payment status:',
            payment.status
          );


          // ===============================================
          // SUCCESS
          // ===============================================

          if (
            payment.status === 'success'
          ) {

            this.zone.run(() => {

              this.stopExpiryTimer();

              this.stopPaymentPolling();


              // Clear cart exactly after
              // successful payment.

              this.clearCartAfterPayment();


              this.stage =
                'processing';


              this.startProcessingUI();


              this.cdr.detectChanges();

            });

          }


          // ===============================================
          // FAILED
          // ===============================================

          if (
            payment.status === 'failed'
          ) {

            this.zone.run(() => {

              this.paymentError =
                'Payment failed. Please generate a new QR.';


              this.stopPaymentPolling();


              this.cdr.detectChanges();

            });

          }

        },


        error: (error) => {

          console.log(
            'Payment polling error:',
            error
          );

        }

      });

  }


  // =========================================================
  // STOP POLLING
  // =========================================================

  private stopPaymentPolling(): void {

    if (
      this.paymentPollingInterval
    ) {

      clearInterval(
        this.paymentPollingInterval
      );

      this.paymentPollingInterval =
        null;

    }

  }


  // =========================================================
  // PROCESSING
  // =========================================================

  private startProcessingUI(): void {

    this.stopProcessingTimers();


    this.processingDot =
      0;


    this.processingSteps = [

      {

        label:
          'Payment received',

        done:
          true

      },

      {

        label:
          'Confirming with bank',

        done:
          false

      },

      {

        label:
          'Placing your order',

        done:
          false

      }

    ];


    this.dotsInterval =
      setInterval(() => {

        this.zone.run(() => {

          this.processingDot =
            (
              this.processingDot + 1
            ) % 4;


          if (
            this.processingDot >= 2
          ) {

            this.processingSteps[1]
              .done = true;

          }


          this.cdr.detectChanges();

        });

      }, 500);


    this.processingTimer =
      setTimeout(() => {

        this.zone.run(() => {

          this.stopProcessingTimers();


          this.processingSteps[1]
            .done = true;


          this.processingSteps[2]
            .done = true;


          this.stage =
            'confirmed';


          this.cdr.detectChanges();

        });

      }, 5000);

  }


  // =========================================================
  // STOP PROCESSING
  // =========================================================

  private stopProcessingTimers(): void {

    if (
      this.processingTimer
    ) {

      clearTimeout(
        this.processingTimer
      );

      this.processingTimer =
        null;

    }


    if (
      this.dotsInterval
    ) {

      clearInterval(
        this.dotsInterval
      );

      this.dotsInterval =
        null;

    }

  }


  // =========================================================
  // COPY UPI
  // =========================================================

  copyUPI(): void {

    if (
      !navigator.clipboard
    ) {

      return;

    }


    navigator.clipboard

      .writeText(
        this.upiId
      )

      .then(() => {

        this.zone.run(() => {

          this.copied =
            true;


          this.cdr.detectChanges();

        });


        setTimeout(() => {

          this.zone.run(() => {

            this.copied =
              false;


            this.cdr.detectChanges();

          });

        }, 2000);

      });

  }


  // =========================================================
  // HOME
  // =========================================================

  goHome(): void {

    this.router.navigate([
      '/dashboard'
    ]);

  }


  // =========================================================
  // EXPIRY MINUTES
  // =========================================================

  get expiryMinutes(): string {

    return Math.floor(
      this.expiry / 60
    )
      .toString()
      .padStart(2, '0');

  }


  // =========================================================
  // EXPIRY SECONDS
  // =========================================================

  get expirySeconds(): string {

    return (
      this.expiry % 60
    )
      .toString()
      .padStart(2, '0');

  }


  // =========================================================
  // PROCESSING DOTS
  // =========================================================

  get processingDots(): string {

    return '.'.repeat(
      this.processingDot
    );

  }


  // =========================================================
  // QR PROGRESS
  // =========================================================

  get progressOffset(): number {

    const radius =
      50;


    const circumference =
      2 * Math.PI * radius;


    const progress =
      (
        this.QR_EXPIRY_SECS -
        this.expiry

      ) /
      this.QR_EXPIRY_SECS;


    return circumference *
      (1 - progress);

  }


  // =========================================================
  // DESTROY
  // =========================================================

  ngOnDestroy(): void {

    this.stopExpiryTimer();

    this.stopPaymentPolling();

    this.stopProcessingTimers();

  }

}