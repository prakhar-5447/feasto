export interface CreateOrderRequest {
    restaurantId: string;
    paymentMethod: string;

    deliveryAddress: {
        fullAddress: string;
        lat: number;
        lng: number;
    };
}

export interface CreateOrderResponse {
    success: boolean;
    message: string;
    data: {
        _id: string;
    };
}