'use client';

import type {
    ComponentType,
    ReactNode,
} from 'react';

import {
    AlertCircle,
    BadgeCheck,
    Bike,
    CheckCircle,
    ChefHat,
    CircleX,
    Clock,
    MapPin,
    Package,
    Phone,
    Receipt,
    RefreshCw,
    RotateCcw,
    Truck,
} from '@/shared/icons';

import Button from '@/shared/components/button/button';

import type {
    Order,
    OrderStatus,
} from '../../orders.types';

import {
    DELIVERY_TIMELINE,
    isAutoRefund,
    REFUND_TIMELINE,
    STATUS_META,
} from '../../orders.types';

import styles from './order-card.module.sass';


type IconComponent = ComponentType<{
    size?: number;
    className?: string;
}>;


const STEP_ICONS: Partial<
    Record<OrderStatus, IconComponent>
> = {
    new: AlertCircle,
    preparing: ChefHat,
    ready: Package,
    driver_assigned: Bike,
    picked_up: Truck,
    delivered: CheckCircle,
    cancelled_returning: RotateCcw,
    return_received: Package,
    refund_processing: RefreshCw,
    refunded: BadgeCheck,
};


interface OrderCardProps {
    order: Order;
    onAccept: () => void;
    onDecline: () => void;
    onMarkReady: () => void;
    onMarkReturned: () => void;
    onProcessRefund: () => void;
}


/* ── Timeline ─────────────────────────────────────────────── */

interface TimelineProps {
    steps: OrderStatus[];
    currentStatus: OrderStatus;
}

function Timeline({
    steps,
    currentStatus,
}: TimelineProps) {

    const currentIndex =
        steps.indexOf(currentStatus);

    return (
        <div
            className={
                styles.timeline
            }
        >
            {steps.map(
                (step, index) => {

                    const Icon =
                        STEP_ICONS[step] ??
                        AlertCircle;

                    const done =
                        index <= currentIndex;

                    const active =
                        index === currentIndex;

                    const isLast =
                        index ===
                        steps.length - 1;

                    return (
                        <div
                            key={step}
                            className={
                                styles.timelineStep
                            }
                        >
                            <div
                                className={[
                                    styles.timelineNode,
                                    done
                                        ? styles.timelineNodeDone
                                        : styles.timelineNodePending,
                                    active
                                        ? styles.timelineNodeActive
                                        : '',
                                ]
                                    .filter(Boolean)
                                    .join(' ')}
                            >
                                <Icon
                                    size={12}
                                />
                            </div>

                            {!isLast && (
                                <div
                                    className={
                                        index <
                                            currentIndex
                                            ? styles.timelineLineDone
                                            : styles.timelineLinePending
                                    }
                                />
                            )}
                        </div>
                    );
                },
            )}
        </div>
    );
}


/* ── Driver Strip ─────────────────────────────────────────── */

interface DriverStripProps {
    driver: string;
    phone: string;
    returning?: boolean;
}

function DriverStrip({
    driver,
    phone,
    returning = false,
}: DriverStripProps) {

    return (
        <div
            className={[
                styles.driverStrip,
                returning
                    ? styles.driverStripReturning
                    : styles.driverStripActive,
            ].join(' ')}
        >
            <div
                className={
                    styles.driverAvatar
                }
            >
                {driver[0]}
            </div>

            <div
                className={
                    styles.driverInfo
                }
            >
                <p>
                    {driver}
                </p>

                <span>
                    {phone}
                </span>
            </div>

            {returning ? (
                <RotateCcw
                    size={16}
                    className={
                        styles.driverIconReturning
                    }
                />
            ) : (
                <Bike
                    size={16}
                    className={
                        styles.driverIconActive
                    }
                />
            )}
        </div>
    );
}


/* ── Notice ───────────────────────────────────────────────── */

interface NoticeProps {
    children: ReactNode;
    background: string;
    border: string;
    color: string;
}

function Notice({
    children,
    background,
    border,
    color,
}: NoticeProps) {

    return (
        <div
            className={
                styles.notice
            }
            style={{
                background,
                borderColor: border,
                color,
            }}
        >
            {children}
        </div>
    );
}


/* ── Refund Panel ────────────────────────────────────────── */

interface CancelledRefundPanelProps {
    order: Order;
    onMarkReturned: () => void;
    onProcessRefund: () => void;
}

function CancelledRefundPanel({
    order,
    onMarkReturned,
    onProcessRefund,
}: CancelledRefundPanelProps) {

    const {
        status,
        paymentMode,
    } = order;


    /* COD cancellation */

    if (
        paymentMode === 'COD'
    ) {
        return (
            <Notice
                background="var(--color-bg-gray)"
                border="var(--color-border-light)"
                color="var(--color-text-secondary)"
            >
                <CircleX
                    size={14}
                />

                <span>
                    Cash on Delivery order —
                    no refund applicable.
                </span>
            </Notice>
        );
    }


    /* Prepaid cancellation before pickup */

    if (
        status === 'cancelled' &&
        isAutoRefund(order)
    ) {
        return (
            <Notice
                background="var(--color-bg-gray)"
                border="var(--color-border-light)"
                color="var(--color-text-secondary)"
            >
                <RefreshCw
                    size={14}
                />

                <div>
                    <p
                        className={
                            styles.noticeTitle
                        }
                    >
                        Auto-refund initiated
                        by platform
                    </p>

                    <p
                        className={
                            styles.noticeDescription
                        }
                    >
                        Order was cancelled before
                        the rider picked it up —
                        ₹{order.total} will be
                        refunded to the customer
                        automatically. No action
                        needed.
                    </p>
                </div>
            </Notice>
        );
    }


    /* Rider returning food */

    if (
        status === 'cancelled_returning'
    ) {
        return (
            <div
                className={
                    styles.refundPanel
                }
            >
                <Notice
                    background="var(--color-bg-orange-soft)"
                    border="var(--color-border-primary)"
                    color="var(--color-primary)"
                >
                    <RotateCcw
                        size={14}
                        className={
                            styles.returningIcon
                        }
                    />

                    <div>
                        <p
                            className={
                                styles.noticeTitle
                            }
                        >
                            Rider is returning
                            the food to your
                            restaurant
                        </p>

                        <p
                            className={
                                styles.noticeDescription
                            }
                        >
                            Once you receive the
                            food, mark it as
                            received. You can then
                            initiate the ₹
                            {order.total} refund
                            for this prepaid order.
                        </p>
                    </div>
                </Notice>


                {order.driver && (
                    <DriverStrip
                        driver={
                            order.driver
                        }
                        phone={
                            order.driverPhone ??
                            ''
                        }
                        returning
                    />
                )}


                <Button
                    type="button"
                    variant="primary"
                    size="md"
                    fullWidth
                    icon={
                        <Package
                            size={16}
                        />
                    }
                    onClick={
                        onMarkReturned
                    }
                >
                    Confirm Food Received
                </Button>

            </div>
        );
    }


    /* Food returned */

    if (
        status === 'return_received'
    ) {
        return (
            <div
                className={
                    styles.refundPanel
                }
            >
                <Timeline
                    steps={
                        REFUND_TIMELINE
                    }
                    currentStatus={
                        status
                    }
                />

                <Notice
                    background="var(--color-bg-orange-soft)"
                    border="var(--color-border-primary)"
                    color="var(--color-primary)"
                >
                    <CheckCircle
                        size={14}
                    />

                    <div>
                        <p
                            className={
                                styles.noticeTitle
                            }
                        >
                            Food returned
                            and verified
                        </p>

                        <p
                            className={
                                styles.noticeDescription
                            }
                        >
                            You can now process
                            the ₹{order.total}
                            refund to the
                            customer's original
                            payment method.
                        </p>
                    </div>
                </Notice>


                <Button
                    type="button"
                    variant="primary"
                    size="md"
                    fullWidth
                    icon={
                        <RefreshCw
                            size={16}
                        />
                    }
                    onClick={
                        onProcessRefund
                    }
                >
                    Process Refund —
                    ₹{order.total}
                </Button>

            </div>
        );
    }


    /* Refund processing */

    if (
        status ===
        'refund_processing'
    ) {
        return (
            <div
                className={
                    styles.refundPanel
                }
            >
                <Timeline
                    steps={
                        REFUND_TIMELINE
                    }
                    currentStatus={
                        status
                    }
                />

                <Notice
                    background="var(--color-bg-orange-soft)"
                    border="var(--color-border-primary)"
                    color="var(--color-primary)"
                >
                    <RefreshCw
                        size={14}
                        className={
                            styles.spinningIcon
                        }
                    />

                    <div>
                        <p
                            className={
                                styles.noticeTitle
                            }
                        >
                            Refund of ₹
                            {order.total}
                            {' '}
                            is being processed
                        </p>

                        <p
                            className={
                                styles.noticeDescription
                            }
                        >
                            Typically takes 3–5
                            business days to
                            reflect in the
                            customer's account.
                        </p>
                    </div>
                </Notice>
            </div>
        );
    }


    /* Refund complete */

    if (
        status === 'refunded'
    ) {
        return (
            <div
                className={
                    styles.refundPanel
                }
            >
                <Timeline
                    steps={
                        REFUND_TIMELINE
                    }
                    currentStatus={
                        status
                    }
                />

                <Notice
                    background="var(--color-success-bg)"
                    border="var(--color-success-border)"
                    color="var(--color-success)"
                >
                    <BadgeCheck
                        size={14}
                    />

                    <span>
                        Refund of ₹
                        {order.total}
                        {' '}
                        completed successfully.
                    </span>
                </Notice>
            </div>
        );
    }


    return null;
}


/* ── Main Order Card ─────────────────────────────────────── */

export default function OrderCard({
    order,
    onAccept,
    onDecline,
    onMarkReady,
    onMarkReturned,
    onProcessRefund,
}: OrderCardProps) {

    const {
        status,
    } = order;

    const meta =
        STATUS_META[status];


    const isCancelFamily = [
        'cancelled',
        'cancelled_returning',
        'return_received',
        'refund_processing',
        'refunded',
    ].includes(status);


    const isDelivered =
        status === 'delivered';


    const deliveryIndex =
        DELIVERY_TIMELINE.indexOf(
            status,
        );

    const isInDeliveryArc =
        deliveryIndex !== -1;


    const cardClassName = [
        styles.card,
        status === 'new'
            ? styles.cardNew
            : '',
        isCancelFamily
            ? styles.cardCancelled
            : '',
        isDelivered ||
            status === 'refunded'
            ? styles.cardCompleted
            : '',
    ]
        .filter(Boolean)
        .join(' ');


    return (
        <article
            className={cardClassName}
        >

            {/* Status Header */}

            <div
                className={
                    styles.statusHeader
                }
                style={{
                    background:
                        meta.bg,
                    borderColor:
                        meta.border,
                }}
            >
                <div
                    className={
                        styles.statusInfo
                    }
                >
                    <span
                        className={[
                            styles.statusDot,
                            status === 'new'
                                ? styles.statusDotNew
                                : '',
                        ]
                            .filter(Boolean)
                            .join(' ')}
                        style={{
                            background:
                                meta.dot,
                        }}
                    />

                    <span
                        className={
                            styles.statusLabel
                        }
                        style={{
                            color:
                                meta.text,
                        }}
                    >
                        {meta.label}
                    </span>

                    <span
                        className={
                            styles.statusDescription
                        }
                        style={{
                            color:
                                meta.text,
                        }}
                    >
                        · {meta.description}
                    </span>
                </div>


                <div
                    className={
                        styles.statusMeta
                    }
                >
                    <span
                        className={[
                            styles.paymentBadge,
                            order.paymentMode ===
                                'COD'
                                ? styles.paymentCod
                                : styles.paymentPrepaid,
                        ].join(' ')}
                    >
                        {order.paymentMode}
                    </span>

                    <span
                        className={
                            styles.placedAt
                        }
                        style={{
                            color:
                                meta.text,
                        }}
                    >
                        {order.placedAt}
                    </span>
                </div>
            </div>


            {/* Card Content */}

            <div
                className={
                    styles.cardContent
                }
            >

                {/* Customer */}

                <div
                    className={
                        styles.customerSection
                    }
                >
                    <div
                        className={
                            styles.customerInfo
                        }
                    >
                        <div
                            className={
                                styles.customerHeading
                            }
                        >
                            <span
                                className={
                                    styles.customerName
                                }
                            >
                                {order.customer}
                            </span>

                            <span
                                className={
                                    styles.orderId
                                }
                            >
                                {order.id}
                            </span>

                            {order.cancelledBy && (
                                <span
                                    className={
                                        styles.cancelledBy
                                    }
                                >
                                    Cancelled by{' '}
                                    {
                                        order.cancelledBy
                                    }
                                </span>
                            )}
                        </div>


                        <div
                            className={
                                styles.contactRow
                            }
                        >
                            <a
                                href={
                                    `tel:${order.phone}`
                                }
                                className={
                                    styles.contactLink
                                }
                            >
                                <Phone
                                    size={12}
                                />

                                {order.phone}
                            </a>

                            <span
                                className={
                                    styles.eta
                                }
                            >
                                <Clock
                                    size={12}
                                />

                                ETA {order.eta}
                            </span>
                        </div>
                    </div>


                    <div
                        className={
                            styles.amount
                        }
                    >
                        <div
                            className={
                                styles.total
                            }
                        >
                            ₹{order.total}
                        </div>

                        <div
                            className={
                                styles.itemCount
                            }
                        >
                            {order.items.length}{' '}
                            item
                            {order.items.length >
                                1
                                ? 's'
                                : ''}
                        </div>
                    </div>
                </div>


                {/* Items */}

                <div
                    className={
                        styles.itemsSection
                    }
                >
                    {order.items.map(
                        (item) => (
                            <div
                                key={`${item.name}-${item.qty}`}
                                className={styles.itemRow}
                            >
                                <span
                                    className={
                                        styles.itemName
                                    }
                                >
                                    <span
                                        className={
                                            styles.itemQuantity
                                        }
                                    >
                                        {item.qty}×
                                    </span>

                                    {' '}

                                    {item.name}
                                </span>

                                <span
                                    className={
                                        styles.itemPrice
                                    }
                                >
                                    ₹{item.price * item.qty}
                                </span>
                            </div>
                        ),
                    )}


                    {order.specialNote && (
                        <div
                            className={
                                styles.noteContainer
                            }
                        >
                            <p
                                className={
                                    styles.note
                                }
                            >
                                <Receipt
                                    size={12}
                                />

                                <span>
                                    <strong>
                                        Note:
                                    </strong>{' '}
                                    {
                                        order.specialNote
                                    }
                                </span>
                            </p>
                        </div>
                    )}
                </div>


                {/* Address */}

                <div
                    className={
                        styles.address
                    }
                >
                    <MapPin
                        size={14}
                    />

                    <span>
                        {order.address}
                    </span>
                </div>


                {/* Delivery timeline */}

                {isInDeliveryArc && (
                    <Timeline
                        steps={
                            DELIVERY_TIMELINE
                        }
                        currentStatus={
                            status
                        }
                    />
                )}


                {/* Driver */}

                {(
                    status ===
                    'driver_assigned' ||
                    status ===
                    'picked_up'
                ) &&
                    order.driver && (
                        <DriverStrip
                            driver={
                                order.driver
                            }
                            phone={
                                order.driverPhone ??
                                ''
                            }
                        />
                    )}


                {/* Driver controlled */}

                {(
                    status ===
                    'driver_assigned' ||
                    status ===
                    'picked_up'
                ) && (
                        <Notice
                            background="var(--color-bg-gray)"
                            border="var(--color-border-light)"
                            color="var(--color-text-secondary)"
                        >
                            <Bike
                                size={14}
                            />

                            <span>
                                Stage managed by the
                                delivery rider — no
                                action needed from your
                                side.
                            </span>
                        </Notice>
                    )}


                {/* Ready */}

                {status === 'ready' && (
                    <Notice
                        background="var(--color-bg-orange-soft)"
                        border="var(--color-border-primary)"
                        color="var(--color-primary)"
                    >
                        <Package
                            size={14}
                        />

                        <span
                            className={
                                styles.noticeMedium
                            }
                        >
                            Food is ready · Waiting
                            for the driver app to
                            assign a rider
                        </span>
                    </Notice>
                )}


                {/* Delivered */}

                {isDelivered && (
                    <div
                        className={
                            styles.delivered
                        }
                    >
                        <CheckCircle
                            size={14}
                        />

                        Delivered successfully
                    </div>
                )}


                {/* Refund */}

                {isCancelFamily && (
                    <CancelledRefundPanel
                        order={order}
                        onMarkReturned={
                            onMarkReturned
                        }
                        onProcessRefund={
                            onProcessRefund
                        }
                    />
                )}


                {/* New Order Actions */}

                {status === 'new' && (
                    <div
                        className={
                            styles.actionRow
                        }
                    >
                        <Button
                            type="button"
                            variant="primary"
                            size="md"
                            fullWidth
                            icon={
                                <CheckCircle
                                    size={16}
                                />
                            }
                            onClick={
                                onAccept
                            }
                        >
                            Accept Order
                        </Button>


                        <Button
                            type="button"
                            variant="ghost"
                            tone="muted"
                            size="md"
                            icon={
                                <CircleX
                                    size={16}
                                />
                            }
                            onClick={
                                onDecline
                            }
                        >
                            Decline
                        </Button>
                    </div>
                )}


                {/* Preparing Action */}

                {status ===
                    'preparing' && (
                        <Button
                            type="button"
                            variant="primary"
                            size="md"
                            fullWidth
                            icon={
                                <Package
                                    size={16}
                                />
                            }
                            onClick={
                                onMarkReady
                            }
                        >
                            Mark as Ready
                            for Pickup
                        </Button>
                    )}

            </div>

        </article>
    );
}