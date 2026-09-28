import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import {
    OrderResponse,
    PaymentResponse,
    CreatePaymentRequest,
    CreatePaymentResponse,
    VerifyPaymentResponse,
} from '@/app/features/payment/models/payment.model';

@Injectable({
    providedIn: 'root',
})
export class PaymentService {

    constructor(
        private readonly http: HttpClient
    ) { }

    getOrder(orderId: string): Observable<OrderResponse> {
        return this.http.get<OrderResponse>(
            `/api/v1/orders/${orderId}`
        );
    }

    getPayment(orderId: string): Observable<PaymentResponse> {
        return this.http.get<PaymentResponse>(
            `/api/v1/payments/${orderId}`
        );
    }

    createPayment(
        request: CreatePaymentRequest
    ): Observable<CreatePaymentResponse> {
        return this.http.post<CreatePaymentResponse>(
            '/api/v1/payments',
            request
        );
    }

    verifyPayment(
        paymentId: string,
        method: string,
        transactionId: string
    ): Observable<VerifyPaymentResponse> {
        return this.http.patch<VerifyPaymentResponse>(
            `/api/v1/payments/${paymentId}/verify`,
            {},
            {
                params: {
                    method,
                    transactionId,
                },
            }
        );
    }
}