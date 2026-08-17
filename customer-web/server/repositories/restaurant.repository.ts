import Restaurant, {
    IRestaurant
} from "../models/restaurant.model";

export const findById = (
    id: string
): Promise<IRestaurant | null> => {
    return Restaurant.findById(id);
};

export const findBySLug = (
    restaurantSLug: string
): Promise<IRestaurant | null> => {
    return Restaurant.findOne({ slug: restaurantSLug });
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

export const findBySlug = (slug: string) => {
    return Restaurant.findOne({ slug });
};
