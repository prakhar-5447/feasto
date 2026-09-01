export type SortOption =
    | 'relevance'
    | 'rating'
    | 'delivery_time'
    | 'distance'
    | 'price_low_to_high'
    | 'price_high_to_low';

export type PriceRange =
    | 'low'
    | 'medium'
    | 'high';


export type DietaryOption =
    | 'veg'
    | 'nonVeg'
    | 'egg'
    | 'vegan'
    | 'halal';

export interface RestaurantFilters {

    // Search
    food?: string;
    cuisine?: string;

    // Restaurant characteristics
    restaurant?: string;
    collection?: string;

    // Dietary
    veg?: boolean;
    nonVeg?: boolean;
    egg?: boolean;
    vegan?: boolean;
    halal?: boolean;

    // Rating
    rating?: number;

    // Price
    price?: PriceRange;

    // Delivery
    maxDeliveryTime?: number;

    // Distance
    maxDistance?: number;

    // Offers
    offers?: boolean;

    // Availability
    openNow?: boolean;

    // Sorting
    sort?: SortOption;
}