import { OrderItem } from '@/app/features/payment/models/order-item.model';

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