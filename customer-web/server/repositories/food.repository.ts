import Food, { IFood } from "../models/food.model";
import Restaurant from "../models/restaurant.model";

export const findById = (
    id: string
): Promise<IFood | null> => {
    return Food.findById(id);
};

export const findByRestaurant = (
    restaurantId: string
): Promise<IFood[]> => {
    return Food.find({
        restaurant: restaurantId
    });
};

export const createFood = (
    data: Partial<IFood>
): Promise<IFood> => {
    return Food.create(data);
};

export const updateFood = (
    id: string,
    data: Partial<IFood>
): Promise<IFood | null> => {
    return Food.findByIdAndUpdate(
        id,
        data,
        {
            new: true,
            runValidators: true
        }
    );
};

export const deleteFood = (
    id: string
): Promise<IFood | null> => {
    return Food.findByIdAndDelete(id);
};

export const updateFoodAvailability = (
    id: string,
    isAvailable: boolean
): Promise<IFood | null> => {
    return Food.findByIdAndUpdate(
        id,
        { isAvailable },
        {
            new: true,
            runValidators: true
        }
    );
};

export type FoodSortOption =
    | "relevance"
    | "rating"
    | "delivery_time"
    | "distance"
    | "price_low_to_high"
    | "price_high_to_low";

export interface FoodFilterQuery {
    food?: string;
    cuisine?: string;
    restaurant?: string;

    veg?: boolean;
    nonVeg?: boolean;
    egg?: boolean;
    vegan?: boolean;
    halal?: boolean;

    rating?: number;

    price?: "low" | "medium" | "high";

    maxDeliveryTime?: number;
    maxDistance?: number;

    city?: string;
    latitude?: number;
    longitude?: number;

    offers?: boolean;
    openNow?: boolean;

    sort?: FoodSortOption;
}

// Distance between two coordinates in KM
const calculateDistance = (
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number
): number => {
    const earthRadiusKm = 6371;

    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;

    const a =
        Math.sin(dLat / 2) ** 2 +
        Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) ** 2;

    const c =
        2 *
        Math.atan2(
            Math.sqrt(a),
            Math.sqrt(1 - a)
        );

    return earthRadiusKm * c;
};

const escapeRegex = (value: string): string => {
    return value.replace(
        /[.*+?^${}()|[\]\\]/g,
        "\\$&"
    );
};

export const filterFoods = async (
    query: FoodFilterQuery
) => {
    const foodFilter: Record<string, any> = {
        isAvailable: true
    };

    // -----------------------------------------
    // FOOD FILTERS
    // -----------------------------------------

    if (query.food) {
        foodFilter["name"] = {
            $regex: escapeRegex(query.food),
            $options: "i"
        };
    }

    if (query.cuisine) {
        foodFilter["cuisine"] = {
            $regex: escapeRegex(query.cuisine),
            $options: "i"
        };
    }

    if (query.veg && !query.nonVeg && !query.egg) {
        foodFilter["foodType"] = "veg";
    }

    if (query.nonVeg && !query.veg && !query.egg) {
        foodFilter["foodType"] = "non_veg";
    }

    if (!query.nonVeg && !query.veg && query.egg) {
        foodFilter["foodType"] = "egg";
    }

    if (query.vegan) {
        foodFilter["isVegan"] = true;
    }

    if (query.halal) {
        foodFilter["isHalal"] = true;
    }

    if (query.rating !== undefined) {
        foodFilter["rating"] = {
            $gte: query.rating
        };
    }

    // -----------------------------------------
    // FIND MATCHING FOODS
    // -----------------------------------------

    const foods = await Food.find(foodFilter)
        .select(
            "_id name image cuisine price rating foodType isAvailable restaurant"
        )
        .lean();

    if (foods.length === 0) {
        return [];
    }

    // -----------------------------------------
    // RESTAURANT IDS
    // -----------------------------------------

    const restaurantIds = [
        ...new Set(
            foods.map(food =>
                food.restaurant.toString()
            )
        )
    ];

    // -----------------------------------------
    // RESTAURANT FILTER
    // -----------------------------------------

    const restaurantFilter: Record<string, any> = {
        _id: {
            $in: restaurantIds
        }
    };

    if (query.restaurant) {
        restaurantFilter["name"] = {
            $regex: escapeRegex(query.restaurant),
            $options: "i"
        };
    }

    if (query.maxDeliveryTime !== undefined) {
        restaurantFilter["estimatedDeliveryTime"] = {
            $lte: query.maxDeliveryTime
        };
    }

    if (query.offers) {
        restaurantFilter["offer"] = {
            $exists: true,
            $nin: ["", null]
        };
    }

    if (query.openNow) {
        restaurantFilter["isOpen"] = true;

        const currentHour =
            new Date().getHours();

        restaurantFilter["$expr"] = {
            $or: [
                {
                    $and: [
                        {
                            $lte: [
                                "$openTime",
                                "$closeTime"
                            ]
                        },
                        {
                            $lte: [
                                "$openTime",
                                currentHour
                            ]
                        },
                        {
                            $gt: [
                                "$closeTime",
                                currentHour
                            ]
                        }
                    ]
                },
                {
                    $and: [
                        {
                            $gt: [
                                "$openTime",
                                "$closeTime"
                            ]
                        },
                        {
                            $or: [
                                {
                                    $gte: [
                                        currentHour,
                                        "$openTime"
                                    ]
                                },
                                {
                                    $lt: [
                                        currentHour,
                                        "$closeTime"
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ]
        };
    }

    // -----------------------------------------
    // GET RESTAURANTS
    // -----------------------------------------

    const restaurants =
        await Restaurant.find(
            restaurantFilter
        )
            .select(
                "_id name slug images cuisine avgRating " +
                "totalReviews isOpen isVeg offer " +
                "priceForTwo estimatedDeliveryTime " +
                "location city area"
            )
            .lean();

    if (restaurants.length === 0) {
        return [];
    }

    // -----------------------------------------
    // RESTAURANT MAP
    // -----------------------------------------

    const restaurantMap = new Map(
        restaurants.map(restaurant => [
            restaurant._id.toString(),
            restaurant
        ])
    );

    // -----------------------------------------
    // REMOVE FOODS WHOSE RESTAURANT DIDN'T MATCH
    // -----------------------------------------

    let filteredFoods = foods.filter(
        food =>
            restaurantMap.has(
                food.restaurant.toString()
            )
    );

    // =================================================
    // DISTANCE CALCULATION
    // =================================================

    const hasCoordinates =
        query.latitude !== undefined &&
        query.longitude !== undefined;

    const distanceMap =
        new Map<string, number>();

    if (hasCoordinates) {
        const userLatitude = query.latitude!;
        const userLongitude = query.longitude!;

        for (const restaurant of restaurants) {
            const restaurantId =
                restaurant._id.toString();

            /*
             * GeoJSON format:
             *
             * location: {
             *     type: "Point",
             *     coordinates: [longitude, latitude]
             * }
             */

            const coordinates =
                restaurant.location?.coordinates;

            if (
                !Array.isArray(coordinates) ||
                coordinates.length < 2
            ) {
                continue;
            }

            // GeoJSON = [longitude, latitude]
            const restaurantLongitude =
                Number(coordinates[0]);

            const restaurantLatitude =
                Number(coordinates[1]);

            if (
                !Number.isFinite(
                    restaurantLatitude
                ) ||
                !Number.isFinite(
                    restaurantLongitude
                )
            ) {
                continue;
            }

            const distance =
                calculateDistance(
                    userLatitude,
                    userLongitude,
                    restaurantLatitude,
                    restaurantLongitude
                );

            distanceMap.set(
                restaurantId,
                distance
            );
        }

        // -----------------------------------------
        // MAX DISTANCE FILTER
        // -----------------------------------------

        if (
            query.maxDistance !== undefined
        ) {
            filteredFoods =
                filteredFoods.filter(food => {
                    const distance =
                        distanceMap.get(
                            food.restaurant.toString()
                        );

                    if (
                        distance === undefined
                    ) {
                        return false;
                    }

                    return (
                        distance <=
                        query.maxDistance!
                    );
                });
        }
    }

    // -----------------------------------------
    // SORT
    // -----------------------------------------

    switch (query.sort) {
        case "rating":
            filteredFoods.sort((a, b) => {
                const restaurantA =
                    restaurantMap.get(
                        a.restaurant.toString()
                    );

                const restaurantB =
                    restaurantMap.get(
                        b.restaurant.toString()
                    );

                return (
                    (restaurantB?.avgRating ?? 0) -
                    (restaurantA?.avgRating ?? 0)
                );
            });

            break;

        case "delivery_time":
            filteredFoods.sort((a, b) => {
                const restaurantA =
                    restaurantMap.get(
                        a.restaurant.toString()
                    );

                const restaurantB =
                    restaurantMap.get(
                        b.restaurant.toString()
                    );

                return (
                    (restaurantA?.estimatedDeliveryTime ?? 0) -
                    (restaurantB?.estimatedDeliveryTime ?? 0)
                );
            });

            break;

        case "price_low_to_high":
            filteredFoods.sort(
                (a, b) =>
                    (a.price ?? 0) -
                    (b.price ?? 0)
            );

            break;

        case "price_high_to_low":
            filteredFoods.sort(
                (a, b) =>
                    (b.price ?? 0) -
                    (a.price ?? 0)
            );

            break;

        case "distance":
            if (hasCoordinates) {
                filteredFoods.sort((a, b) => {
                    const distanceA =
                        distanceMap.get(
                            a.restaurant.toString()
                        ) ?? Infinity;

                    const distanceB =
                        distanceMap.get(
                            b.restaurant.toString()
                        ) ?? Infinity;

                    return (
                        distanceA - distanceB
                    );
                });
            }

            break;

        case "relevance":
        default:
            filteredFoods.sort((a, b) => {
                const restaurantA =
                    restaurantMap.get(
                        a.restaurant.toString()
                    );

                const restaurantB =
                    restaurantMap.get(
                        b.restaurant.toString()
                    );

                return (
                    (restaurantB?.avgRating ?? 0) -
                    (restaurantA?.avgRating ?? 0)
                );
            });

            break;
    }

    // -----------------------------------------
    // RETURN FRONTEND FORMAT
    // -----------------------------------------

    return filteredFoods.map(food => {
        const restaurant =
            restaurantMap.get(
                food.restaurant.toString()
            );

        const restaurantId =
            food.restaurant.toString();

        const distance =
            distanceMap.get(restaurantId);

        return {
            _id: food._id.toString(),

            name: food.name,

            restaurant: {
                _id: restaurant!._id.toString(),
                name: restaurant!.name,
                slug: restaurant!.slug
            },

            image: food.image || "",

            cuisine:
                food.cuisine ||
                restaurant!.cuisine?.[0] ||
                "",

            priceForTwo:
                food.price,

            rating:
                food.rating ??
                restaurant!.avgRating ??
                0,

            estimatedDeliveryTime:
                restaurant!.estimatedDeliveryTime ??
                0,

            // Distance in KM
            distance:
                distance !== undefined
                    ? Number(
                        distance.toFixed(2)
                    )
                    : null,

            location: {
                city:
                    restaurant!.city || "",

                area:
                    restaurant!.area || ""
            },

            isAvailable:
                food.isAvailable,

            ...(restaurant!.offer
                ? {
                    offer: restaurant!.offer
                }
                : {}),

            isVeg:
                food.foodType === "veg"
        };
    });
};