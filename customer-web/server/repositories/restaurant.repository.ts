import Restaurant, { IRestaurant } from "../models/restaurant.model";

export const findNearbyRestaurants = async (
    lng: number,
    lat: number,
    radius: number
): Promise<IRestaurant[]> => {

    const restaurants = await Restaurant.find({
        location: {
            $near: {
                $geometry: {
                    type: "Point",
                    coordinates: [lng, lat],
                },
                $maxDistance: radius,
            },
        },
    });

    return restaurants;
};

export const getRestaurants = async (query: any): Promise<{
    restaurants: IRestaurant[];
    total: number;
    page: number;
    limit: number;
}> => {

    const page = parseInt(query.page) || 1;
    const limit = parseInt(query.limit) || 10;

    const skip = (page - 1) * limit;

    const filter: any = {};

    if (query.priceRange) {
        filter.priceRange = query.priceRange;
    }

    if (query.minRating) {
        filter.avgRating = { $gte: query.minRating };
    }

    const sort: any = {};

    if (query.sort) {
        sort[query.sort] = -1;
    }

    const restaurants = await Restaurant.find(filter)
        .sort(sort)
        .skip(skip)
        .limit(limit);

    const total = await Restaurant.countDocuments(filter);

    return {
        restaurants,
        total,
        page,
        limit,
    };
};

export const createRestaurant = async (
    data: Partial<IRestaurant>
): Promise<IRestaurant> => {
    return Restaurant.create(data);
};

export const findByOwner = async (
    ownerId: string
): Promise<IRestaurant | null> => {
    return Restaurant.findOne({ owner: ownerId });
};

export const updateRestaurant = async (
    id: string,
    data: Partial<IRestaurant>
): Promise<IRestaurant | null> => {
    return Restaurant.findByIdAndUpdate(id, data, { new: true });
};

export const findById = async (
    id: string
): Promise<IRestaurant | null> => {
    return Restaurant.findById(id);
};