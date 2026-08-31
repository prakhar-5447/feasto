export interface Restaurant {
    _id: string;
    name: string;
    
    restaurant: {
        _id: string;
        name: string;
        slug: string;
    };


    image: string;

    cuisines: string[];

    rating: number;
    deliveryTime: number;

    location: {
        city: string;
        area: string;
    };

    priceForTwo: number;
    distance?: number;

    offer?: string;

    isVeg?: boolean;

}