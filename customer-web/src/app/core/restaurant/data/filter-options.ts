import {
    PriceRange,
    SortOption
} from '../models/filter.model';
import { RESTAURANT_CATEGORIES } from './restaurant-categories';


export interface FilterOption<T = string> {
    value: T;
    label: string;
}


export const RESTAURANT_FILTER_OPTIONS = {

    cuisines: RESTAURANT_CATEGORIES,

    restaurants: [
        'Popular',
        'Highly Rated'
    ],

    collections: [
        'Trending',
        'Best of Dhanbad',
        'Newly Added'
    ],

    ratings: [
        4,
        3,
        2
    ],

    priceRanges: [
        {
            value: 'low',
            label: 'Low'
        },
        {
            value: 'medium',
            label: 'Medium'
        },
        {
            value: 'high',
            label: 'High'
        }
    ] satisfies FilterOption<PriceRange>[],

    deliveryTimes: [
        {
            value: 20,
            label: 'Under 20 min'
        },
        {
            value: 30,
            label: 'Under 30 min'
        },
        {
            value: 45,
            label: 'Under 45 min'
        }
    ] satisfies FilterOption<number>[],

    distances: [
        {
            value: 2,
            label: 'Within 2 km'
        },
        {
            value: 5,
            label: 'Within 5 km'
        },
        {
            value: 10,
            label: 'Within 10 km'
        }
    ] satisfies FilterOption<number>[],

    sortOptions: [
        {
            value: 'relevance',
            label: 'Relevance'
        },
        {
            value: 'rating',
            label: 'Rating'
        },
        {
            value: 'delivery_time',
            label: 'Delivery time'
        },
        {
            value: 'distance',
            label: 'Distance'
        },
        {
            value: 'price_low_to_high',
            label: 'Price: Low to High'
        },
        {
            value: 'price_high_to_low',
            label: 'Price: High to Low'
        }
    ] satisfies FilterOption<SortOption>[]

} as const;