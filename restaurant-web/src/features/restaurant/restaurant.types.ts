export interface Restaurant {
    id: string;
    name: string;
    slug: string;
    description?: string;
    images?: string[];
    address?: string;
    area?: string;
    city?: string;
    state?: string;
    cuisine: string[];
    priceRange?: number;
    avgRating: number;
    totalReviews: number;
    isOpen: boolean;
    isVeg: boolean;
    openTime: number;
    closeTime: number;
    offer?: string;
    priceForTwo?: number;
    estimatedDeliveryTime?: number;
    acceptingOrders: boolean;
}

export interface GetRestaurantResponse {
    success: boolean;
    data: Restaurant;
    message?: string;
}

export interface UpdateRestaurantRequest {
    name?: string;
    slug?: string;
    description?: string;
    images?: string[];
    address?: string;
    area?: string;
    city?: string;
    state?: string;
    cuisine?: string[];
    priceRange?: number;
    avgRating?: number;
    totalReviews?: number;
    isOpen?: boolean;
    isVeg?: boolean;
    openTime?: number;
    closeTime?: number;
    offer?: string;
    priceForTwo?: number;
    estimatedDeliveryTime?: number;
    acceptingOrders?: boolean;
}

export interface UpdateRestaurantResponse {
    success: boolean;
    message: string;
    data: Restaurant;
}