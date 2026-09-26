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