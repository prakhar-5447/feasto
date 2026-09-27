export interface OrderResponse {
    success: boolean;
    message?: string;
    data: Order;
}

export interface Order {
    _id: string;
    paymentStatus?: string;
    billing?: {
        grandTotal?: number;
        itemTotal?: number;
        discount?: number;
        deliveryFee?: number;
        platformFee?: number;
        gst?: number;
    };
    deliveryAddress?: {
        fullAddress?: string;
    };
    restaurantSnapshot?: {
        name?: string;
    };
    items?: Array<{
        name: string;
        quantity: number;
        price: number;
    }>;
}

export interface Payment {
    _id: string;
    transactionId?: string;
    status: 'pending' | 'success' | 'failed';
}

export interface PaymentResponse {
    success: boolean;
    message?: string;
    data: Payment;
}

export interface CreatePaymentRequest {
    orderId: string;
    method: string;
}

export interface CreatePaymentResponse {
    success: boolean;
    message?: string;
    data: {
        payment: Payment;
        providerResponse?: {
            qrData?: string;
        };
    };
}

export interface VerifyPaymentResponse {
    success: boolean;
    message?: string;
    data?: Payment;
}