export interface RestaurantResult {
    _id: string;
    name: string;
    slug: string;
}

export interface FoodResult {
    _id: string;
    name: string;
}

export interface RestaurantSearchResponse {
    data?: {
        restaurants?: RestaurantResult[];
        foods?: FoodResult[];
        cuisines?: string[];
    };
}