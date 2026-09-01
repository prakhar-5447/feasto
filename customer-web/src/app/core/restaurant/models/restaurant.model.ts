export interface Restaurant {

    _id: string;
    name: string;

    restaurant: {
        _id: string;
        name: string;
        slug: string;
    };

    image: string;

    cuisine: string[];

    priceForTwo: number;

    rating: number;

    estimatedDeliveryTime: number;

    location: {
        city: string;
        area: string;
    };

    isAvailable: boolean;

    offer?: string;

    isVeg: boolean;

    distance?: number;
}

export interface RestaurantDetail {
    _id: string;
    name: string;

    restaurant: {
        _id: string;
        name: string;
        slug: string;
    };

    // Images
    images: string[];

    // Classification
    cuisine: string[];

    // Pricing
    pricing: {
        priceForTwo: number;
    };


    // Rating
    rating: {
        average: number;
        totalReviews: number;
    };

    // Delivery
    delivery: {
        estimatedTime: number;
    };

    // Location
    location: {
        city: string;
        area: string;
        address: string;

        coordinates: [
            number,
            number
        ];
    };

    // Opening hours
    hours: {
        open: number;
        close: number;
    };

    // Restaurant status
    isAvailable: boolean;

    // Offers
    offer?: string;

    // Food preference
    isVeg: boolean;
}