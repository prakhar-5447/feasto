'use client';

import type {
    ChangeEvent,
} from 'react';

import {
    Search,
} from '@/shared/icons';

import type {
    OrderStatus,
} from '../../orders.types';

import styles from './order-filters.module.sass';


type OrderFilter =
    | 'all'
    | OrderStatus;


interface FilterOption {
    value: OrderFilter;
    label: string;
    dotClass?: string;
}


const FILTER_OPTIONS: FilterOption[] = [
    {
        value: 'all',
        label: 'All',
    },
    {
        value: 'new',
        label: 'New',
        dotClass: 'dotNew',
    },
    {
        value: 'preparing',
        label: 'Preparing',
        dotClass: 'dotPreparing',
    },
    {
        value: 'ready',
        label: 'Ready',
        dotClass: 'dotReady',
    },
    {
        value: 'driver_assigned',
        label: 'Driver',
        dotClass: 'dotDriver',
    },
    {
        value: 'picked_up',
        label: 'In Transit',
        dotClass: 'dotTransit',
    },
    {
        value: 'delivered',
        label: 'Delivered',
        dotClass: 'dotDelivered',
    },
    {
        value: 'cancelled',
        label: 'Cancelled / Refunds',
        dotClass: 'dotCancelled',
    },
];


interface OrderFiltersProps {
    filter: OrderFilter;
    onFilter: (
        filter: OrderFilter,
    ) => void;

    search: string;
    onSearch: (
        search: string,
    ) => void;

    counts: Record<
        string,
        number
    >;
}


export default function OrderFilters({
    filter,
    onFilter,
    search,
    onSearch,
    counts,
}: OrderFiltersProps) {

    const handleSearch = (
        event: ChangeEvent<HTMLInputElement>,
    ) => {
        onSearch(
            event.target.value,
        );
    };


    return (
        <div
            className={
                styles.filters
            }
        >

            {/* Search */}

            <div
                className={
                    styles.searchWrapper
                }
            >

                <Search
                    size={16}
                    className={
                        styles.searchIcon
                    }
                />

                <input
                    className={
                        styles.searchInput
                    }
                    value={search}
                    onChange={
                        handleSearch
                    }
                    placeholder="Search by order ID or customer name..."
                    type="search"
                    aria-label="Search orders"
                />

            </div>


            {/* Status filters */}

            <div
                className={
                    styles.statusFilters
                }
            >

                {FILTER_OPTIONS.map(
                    ({
                        value,
                        label,
                        dotClass,
                    }) => {

                        const count =
                            counts[value] ??
                            0;

                        const isActive =
                            filter === value;

                        return (
                            <button
                                key={value}
                                type="button"
                                className={[
                                    styles.filterButton,
                                    isActive
                                        ? styles.filterButtonActive
                                        : '',
                                ]
                                    .filter(Boolean)
                                    .join(' ')}
                                onClick={() =>
                                    onFilter(
                                        value,
                                    )
                                }
                            >

                                {dotClass &&
                                    !isActive && (
                                        <span
                                            className={[
                                                styles.filterDot,
                                                styles[
                                                dotClass
                                                ],
                                            ].join(
                                                ' ',
                                            )}
                                        />
                                    )}

                                <span>
                                    {label}
                                </span>


                                {count >
                                    0 && (
                                        <span
                                            className={
                                                [
                                                    styles.count,
                                                    isActive
                                                        ? styles.countActive
                                                        : '',
                                                ]
                                                    .filter(
                                                        Boolean,
                                                    )
                                                    .join(
                                                        ' ',
                                                    )
                                            }
                                        >
                                            {count}
                                        </span>
                                    )}

                            </button>
                        );
                    },
                )}

            </div>

        </div>
    );
}