import Restaurant, {
    IRestaurant
} from "../models/restaurant.model";

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

export const findById = (
    id: string
): Promise<IRestaurant | null> => {
    return Restaurant.findById(id);
};

export const findBySlug = (
    slug: string
): Promise<IRestaurant | null> => {
    return Restaurant.findOne({
        slug
    }).lean();
};

export const findByOwner = (
    ownerId: string
): Promise<IRestaurant | null> => {
    return Restaurant.findOne({
        owner: ownerId
    });
};

export const createRestaurant = (
    data: Partial<IRestaurant>
): Promise<IRestaurant> => {
    return Restaurant.create(data);
};

export const updateRestaurant = (
    id: string,
    data: Partial<IRestaurant>
): Promise<IRestaurant | null> => {
    return Restaurant.findOneAndUpdate(
        { _id: id },
        data,
        {
            new: true,
            runValidators: true
        }
    );
};

export const deleteRestaurant = (
    id: string
): Promise<IRestaurant | null> => {
    return Restaurant.findByIdAndDelete(id);
};

export const findNearby = (
    longitude: number,
    latitude: number,
    maxDistance?: number
): Promise<IRestaurant[]> => {
    const query: any = {
        location: {
            $near: {
                $geometry: {
                    type: "Point",
                    coordinates: [
                        longitude,
                        latitude
                    ]
                }
            }
        }
    };

    if (maxDistance !== undefined) {
        query.location.$near.$maxDistance =
            maxDistance;
    }

    return Restaurant.find(query);
};

export const findAll = (): Promise<IRestaurant[]> => {
    return Restaurant.find({
        isOpen: true
    }).sort({
        createdAt: -1
    });
};