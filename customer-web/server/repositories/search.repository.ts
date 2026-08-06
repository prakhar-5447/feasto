import Restaurant from "../models/restaurant.model";
import Food from "../models/food.model";

export const searchRestaurants = async (query: any) => {

    const {
        keyword,
        minRating,
        priceRange,
        lat,
        lng,
        radius,
        cuisine,
        food
    } = query;

    const filter: Record<string, any> = {};

    // Search by restaurant name or cuisine
    if (keyword) {
        filter["$or"] = [
            {
                name: {
                    $regex: keyword,
                    $options: "i"
                }
            },
            {
                category: {
                    $regex: keyword,
                    $options: "i"
                }
            }
        ];
    }

    // Cuisine filter
    if (cuisine) {
        filter["category"] = {
            $regex: cuisine,
            $options: "i"
        };
    }

    // Rating filter
    if (minRating) {
        filter["avgRating"] = {
            $gte: Number(minRating)
        };
    }

    // Price filter
    if (priceRange) {
        filter["priceRange"] = Number(priceRange);
    }

    // Nearby restaurants
    if (lat && lng) {
        filter["location"] = {
            $near: {
                $geometry: {
                    type: "Point",
                    coordinates: [
                        Number(lng),
                        Number(lat)
                    ]
                },
                $maxDistance: Number(radius) || 5000
            }
        };
    }

    // Food filter
    if (food) {

        const foods = await Food.find({
            name: {
                $regex: food,
                $options: "i"
            }
        }).select("restaurant");

        const restaurantIds = [
            ...new Set(
                foods.map(item => item.restaurant.toString())
            )
        ];

        filter["_id"] = {
            $in: restaurantIds
        };
    }

    return await Restaurant.find(filter)
        .limit(20);
};