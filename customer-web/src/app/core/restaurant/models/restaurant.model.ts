export interface Restaurant {
    _id: string;
    name: string;

    restaurant: {
        _id: string;
        name: string;
        slug: string;
    };


    image: string;

    cuisine: string;

    price: number;
    rating: number;

    preparationTime: number;

    location: {
        city: string;
        area: string;
    };

    isAvailable: boolean;
    isFeatured: boolean;

    priceForTwo: number;
    distance?: number;

    offer?: string;

    isVeg?: boolean;

}