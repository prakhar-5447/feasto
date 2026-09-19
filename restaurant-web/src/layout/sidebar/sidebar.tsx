'use client';

import {
    useState,
} from 'react';

import Link from 'next/link';

import {
    usePathname,
} from 'next/navigation';

import {
    useGetRestaurantQuery,
    useUpdateRestaurantStatusMutation,
} from '@/features/restaurant/restaurant.api';

import {
    ShoppingBag,
    BarChart2,
    UtensilsCrossed,
    Star,
    ImageIcon,
    User,
    ChevronLeft,
    ChevronRight,
    Power,
} from '@/shared/icons';

import styles from './sidebar.module.sass';


type PageId =
    | 'orders'
    | 'analytics'
    | 'menu'
    | 'reviews'
    | 'gallery'
    | 'profile';


interface NavItem {
    id: PageId;
    label: string;
    href: string;
    icon: React.ComponentType<{
        size?: number;
        className?: string;
    }>;
    badge?: number;
}


const NAV_ITEMS: NavItem[] = [
    {
        id: 'orders',
        label: 'Orders',
        href: '/dashboard',
        icon: ShoppingBag,
        badge: 3,
    },
    {
        id: 'analytics',
        label: 'Analytics',
        href: '/dashboard/analytics',
        icon: BarChart2,
    },
    {
        id: 'menu',
        label: 'Menu',
        href: '/dashboard/menu',
        icon: UtensilsCrossed,
    },
    {
        id: 'reviews',
        label: 'Reviews',
        href: '/dashboard/reviews',
        icon: Star,
        badge: 2,
    },
    {
        id: 'gallery',
        label: 'Gallery',
        href: '/dashboard/gallery',
        icon: ImageIcon,
    },
    {
        id: 'profile',
        label: 'Profile',
        href: '/dashboard/profile',
        icon: User,
    },
];


export default function Sidebar() {

    const pathname = usePathname();

    const [
        collapsed,
        setCollapsed,
    ] = useState(false);

    const isActive = (
        item: NavItem,
    ): boolean => {

        if (item.id === 'orders') {
            return pathname === item.href;
        }

        return (
            pathname === item.href ||
            pathname.startsWith(`${item.href}/`)
        );
    };

    const {
        data: restaurant,
        isLoading,
    } = useGetRestaurantQuery();

    const [
        updateRestaurantStatus,
        {
            isLoading: isUpdatingStatus,
        },
    ] = useUpdateRestaurantStatusMutation();

    const isOpen =
        restaurant?.isOpen ?? false;

    const handleToggleOpen = async () => {
        try {
            await updateRestaurantStatus({
                isOpen: !isOpen,
            }).unwrap();
        } catch (error) {
            console.error(
                'Failed to update restaurant status:',
                error
            );
        }
    };

    return (
        <aside
            className={[
                styles.sidebar,
                collapsed
                    ? styles.collapsed
                    : '',
            ]
                .filter(Boolean)
                .join(' ')}
        >

            {/* Logo */}

            <div
                className={
                    styles.logoSection
                }
            >

                <div className={styles.logo}>
                    <span>
                        F
                    </span>
                </div>


                <div
                    className={
                        styles.brand
                    }
                >

                    <div
                        className={
                            styles.brandName
                        }
                    >
                        Partner Hub
                    </div>

                    <div
                        className={
                            styles.brandSubtitle
                        }
                    >
                        Restaurant Portal
                    </div>

                </div>

            </div>


            {/* Restaurant identity */}

            <div
                className={
                    styles.restaurantCard
                }
            >

                <div
                    className={
                        styles.restaurantIdentity
                    }
                >

                    <div
                        className={
                            styles.restaurantLogo
                        }
                    >
                        TB
                    </div>


                    <div
                        className={
                            styles.restaurantInfo
                        }
                    >

                        <p>
                            The Biryani Co.
                        </p>

                        <span>
                            Pune, Maharashtra
                        </span>

                    </div>

                </div>

            </div>


            {/* Navigation */}

            <nav
                className={
                    styles.navigation
                }
                aria-label="Restaurant navigation"
            >

                <div
                    className={
                        styles.navigationItems
                    }
                >

                    {NAV_ITEMS.map(
                        ({
                            id,
                            label,
                            href,
                            icon: Icon,
                            badge,
                        }) => {

                            const active =
                                isActive({
                                    id,
                                    label,
                                    href,
                                    icon: Icon,
                                    badge,
                                });

                            return (
                                <Link
                                    key={id}
                                    href={href}
                                    title={
                                        collapsed
                                            ? label
                                            : undefined
                                    }
                                    className={[
                                        styles.navItem,
                                        active
                                            ? styles.active
                                            : '',
                                    ]
                                        .filter(Boolean)
                                        .join(' ')}
                                >

                                    {active && (
                                        <span
                                            className={
                                                styles.activeIndicator
                                            }
                                        />
                                    )}


                                    <Icon
                                        size={18}
                                    />


                                    <span
                                        className={
                                            styles.navLabel
                                        }
                                    >
                                        {label}
                                    </span>


                                    {badge !==
                                        undefined &&
                                        badge > 0 && (
                                            <span
                                                className={
                                                    styles.badge
                                                }
                                            >
                                                {badge}
                                            </span>
                                        )}

                                </Link>
                            );
                        },
                    )}

                </div>

            </nav>


            {/* Restaurant status */}

            <div
                className={
                    styles.statusSection
                }
            >

                <button
                    disabled={
                        isLoading ||
                        isUpdatingStatus
                    }

                    type="button"
                    className={[
                        styles.statusButton,
                        isOpen
                            ? styles.statusOpen
                            : styles.statusClosed,
                    ].join(' ')}
                    onClick={
                        handleToggleOpen
                    }
                    title={
                        collapsed
                            ? isOpen
                                ? 'Close Restaurant'
                                : 'Open Restaurant'
                            : undefined
                    }
                >

                    <Power
                        size={16}
                    />


                    <div
                        className={
                            styles.statusContent
                        }
                    >

                        <div
                            className={
                                styles.statusTitle
                            }
                        >
                            {isOpen
                                ? 'Restaurant Open'
                                : 'Restaurant Closed'}
                        </div>

                        <div
                            className={
                                styles.statusDescription
                            }
                        >
                            {isOpen
                                ? 'Accepting orders'
                                : 'Not accepting orders'}
                        </div>

                    </div>


                    <span
                        className={
                            styles.toggle
                        }
                    >

                        <span
                            className={
                                styles.toggleThumb
                            }
                        />

                    </span>

                </button>

            </div>


            {/* Collapse */}

            <div
                className={
                    styles.collapseSection
                }
            >

                <button
                    type="button"
                    className={
                        styles.collapseButton
                    }
                    onClick={() =>
                        setCollapsed(
                            (value) => !value,
                        )
                    }
                >

                    {collapsed ? (
                        <ChevronRight
                            size={16}
                        />
                    ) : (
                        <>
                            <ChevronLeft
                                size={16}
                            />

                            <span>
                                Collapse
                            </span>
                        </>
                    )}

                </button>

            </div>

        </aside>
    );
}