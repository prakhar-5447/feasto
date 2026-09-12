export type OrderStatus =
    | 'new'
    | 'preparing'
    | 'ready'
    | 'driver_assigned'
    | 'picked_up'
    | 'delivered'
    | 'cancelled'
    | 'cancelled_returning'
    | 'return_received'
    | 'refund_processing'
    | 'refunded';

export interface OrderItem {
    name: string;
    qty: number;
    price: number;
}

export interface Order {
    id: string;
    customer: string;
    phone: string;
    items: OrderItem[];
    total: number;
    address: string;
    placedAt: string;
    eta: string;
    status: OrderStatus;
    driver: string | null;
    driverPhone: string | null;
    specialNote?: string;
    paymentMode: 'Prepaid' | 'COD';
    cancelledFrom?: OrderStatus;
    cancelledBy?: 'customer' | 'restaurant';
}

export const RESTAURANT_ACTIONABLE: OrderStatus[] = [
    'new',
    'preparing',
    'return_received',
];

export const DRIVER_CONTROLLED: OrderStatus[] = [
    'driver_assigned',
    'picked_up',
    'cancelled_returning',
];

export function needsReturn(
    order: Order,
): boolean {
    return (
        order.paymentMode === 'Prepaid' &&
        !!order.cancelledFrom &&
        [
            'picked_up',
            'driver_assigned',
        ].includes(order.cancelledFrom)
    );
}

export function isAutoRefund(
    order: Order,
): boolean {
    return (
        order.status === 'cancelled' &&
        order.paymentMode === 'Prepaid' &&
        !needsReturn(order)
    );
}

export const STATUS_META: Record<
    OrderStatus,
    {
        label: string;
        bg: string;
        text: string;
        border: string;
        dot: string;
        description: string;
    }
> = {
    new: {
        label: 'New Order',
        bg: 'var(--status-new-bg)',
        text: 'var(--status-new-text)',
        border: 'var(--status-new-border)',
        dot: 'var(--status-new-dot)',
        description: 'Awaiting acceptance',
    },

    preparing: {
        label: 'Preparing',
        bg: 'var(--status-prep-bg)',
        text: 'var(--status-prep-text)',
        border: 'var(--status-prep-border)',
        dot: 'var(--status-prep-dot)',
        description:
            'Kitchen is working on it',
    },

    ready: {
        label: 'Ready for Pickup',
        bg: 'var(--status-ready-bg)',
        text: 'var(--status-ready-text)',
        border: 'var(--status-ready-border)',
        dot: 'var(--status-ready-dot)',
        description:
            'Waiting for delivery rider',
    },

    driver_assigned: {
        label: 'Driver Assigned',
        bg: 'var(--status-driver-bg)',
        text: 'var(--status-driver-text)',
        border: 'var(--status-driver-border)',
        dot: 'var(--status-driver-dot)',
        description:
            'Rider on the way to you',
    },

    picked_up: {
        label: 'Out for Delivery',
        bg: 'var(--status-transit-bg)',
        text: 'var(--status-transit-text)',
        border: 'var(--status-transit-border)',
        dot: 'var(--status-transit-dot)',
        description:
            'Rider heading to customer',
    },

    delivered: {
        label: 'Delivered',
        bg: 'var(--status-done-bg)',
        text: 'var(--status-done-text)',
        border: 'var(--status-done-border)',
        dot: 'var(--status-done-dot)',
        description:
            'Order completed',
    },

    cancelled: {
        label: 'Cancelled',
        bg: 'var(--status-cancel-bg)',
        text: 'var(--status-cancel-text)',
        border: 'var(--status-cancel-border)',
        dot: 'var(--status-cancel-dot)',
        description:
            'Order was cancelled',
    },

    cancelled_returning: {
        label: 'Returning to Restaurant',
        bg: 'var(--status-return-bg)',
        text: 'var(--status-return-text)',
        border: 'var(--status-return-border)',
        dot: 'var(--status-return-dot)',
        description:
            'Rider returning food to you',
    },

    return_received: {
        label: 'Food Returned',
        bg: 'var(--status-refund-bg)',
        text: 'var(--status-refund-text)',
        border: 'var(--status-refund-border)',
        dot: 'var(--status-refund-dot)',
        description:
            'Ready to initiate refund',
    },

    refund_processing: {
        label: 'Refund Processing',
        bg: 'var(--status-refund-bg)',
        text: 'var(--status-refund-text)',
        border: 'var(--status-refund-border)',
        dot: 'var(--status-refund-dot)',
        description:
            'Refund in progress',
    },

    refunded: {
        label: 'Refunded',
        bg: 'var(--status-done-bg)',
        text: 'var(--status-done-text)',
        border: 'var(--status-done-border)',
        dot: 'var(--status-done-dot)',
        description:
            'Refund complete',
    },
};

export const DELIVERY_TIMELINE: OrderStatus[] = [
    'new',
    'preparing',
    'ready',
    'driver_assigned',
    'picked_up',
    'delivered',
];

export const REFUND_TIMELINE: OrderStatus[] = [
    'cancelled_returning',
    'return_received',
    'refund_processing',
    'refunded',
];