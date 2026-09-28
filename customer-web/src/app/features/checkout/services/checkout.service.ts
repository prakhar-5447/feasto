import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import {
    CreateOrderRequest,
    CreateOrderResponse
} from '@/app/features/checkout/models/order.model';

@Injectable({
    providedIn: 'root'
})
export class CheckoutService {
    constructor(
        private readonly http: HttpClient
    ) { }

    createOrder(
        request: CreateOrderRequest
    ): Observable<CreateOrderResponse> {
        return this.http.post<CreateOrderResponse>(
            '/api/v1/orders',
            request
        );
    }
}