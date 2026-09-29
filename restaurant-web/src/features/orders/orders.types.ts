export type OrderStatus =
    | "new"
    | "preparing"
    | "ready"
    | "driver_assigned"
    | "picked_up"
    | "delivered"
    | "cancelled"
    | "cancelled_returning"
    | "return_received"
    | "refund_processing"
    | "refunded";

export interface OrderItem {
    name: string;
    qty: number;
    price: number;
}

export type OrderFilter = 'all' | OrderStatus;

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

    paymentMode: "Prepaid" | "COD";

    cancelledFrom?: OrderStatus;

    cancelledBy?:
    | "customer"
    | "restaurant";
}

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

export const STATUS_META: Record<
    OrderStatus,
    {
        label: string;
        description: string;
        bg: string;
        border: string;
        text: string;
        dot: string;
    }
> = {
    new: {
        label: 'New Order',
        description: 'Awaiting restaurant action',
        bg: 'var(--color-bg-orange-soft)',
        border: 'var(--color-border-primary)',
        text: 'var(--color-primary)',
        dot: 'var(--color-primary)',
    },
    preparing: {
        label: 'Preparing',
        description: 'Restaurant is preparing the order',
        bg: 'var(--color-bg-orange-soft)',
        border: 'var(--color-border-primary)',
        text: 'var(--color-primary)',
        dot: 'var(--color-primary)',
    },
    ready: {
        label: 'Ready',
        description: 'Waiting for driver pickup',
        bg: 'var(--color-bg-orange-soft)',
        border: 'var(--color-border-primary)',
        text: 'var(--color-primary)',
        dot: 'var(--color-primary)',
    },
    driver_assigned: {
        label: 'Driver Assigned',
        description: 'Driver is assigned',
        bg: 'var(--color-bg-gray)',
        border: 'var(--color-border-light)',
        text: 'var(--color-text-secondary)',
        dot: 'var(--color-text-secondary)',
    },
    picked_up: {
        label: 'Picked Up',
        description: 'Driver has picked up the order',
        bg: 'var(--color-bg-gray)',
        border: 'var(--color-border-light)',
        text: 'var(--color-text-secondary)',
        dot: 'var(--color-text-secondary)',
    },
    delivered: {
        label: 'Delivered',
        description: 'Order delivered successfully',
        bg: 'var(--color-success-bg)',
        border: 'var(--color-success-border)',
        text: 'var(--color-success)',
        dot: 'var(--color-success)',
    },
    cancelled: {
        label: 'Cancelled',
        description: 'Order was cancelled',
        bg: 'var(--color-bg-gray)',
        border: 'var(--color-border-light)',
        text: 'var(--color-text-secondary)',
        dot: 'var(--color-text-secondary)',
    },
    cancelled_returning: {
        label: 'Returning',
        description: 'Driver is returning the food',
        bg: 'var(--color-bg-orange-soft)',
        border: 'var(--color-border-primary)',
        text: 'var(--color-primary)',
        dot: 'var(--color-primary)',
    },
    return_received: {
        label: 'Food Received',
        description: 'Restaurant received the returned food',
        bg: 'var(--color-bg-orange-soft)',
        border: 'var(--color-border-primary)',
        text: 'var(--color-primary)',
        dot: 'var(--color-primary)',
    },
    refund_processing: {
        label: 'Refund Processing',
        description: 'Refund is being processed',
        bg: 'var(--color-bg-orange-soft)',
        border: 'var(--color-border-primary)',
        text: 'var(--color-primary)',
        dot: 'var(--color-primary)',
    },
    refunded: {
        label: 'Refunded',
        description: 'Refund completed',
        bg: 'var(--color-success-bg)',
        border: 'var(--color-success-border)',
        text: 'var(--color-success)',
        dot: 'var(--color-success)',
    },
};

export function isAutoRefund(order: Order): boolean {
    return (
        order.status === 'cancelled' &&
        order.paymentMode !== 'COD'
    );
}