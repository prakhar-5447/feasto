import Restaurant from "../models/restaurant.model";
import Food from "../models/food.model";

export const searchItems = async (
    keyword: string
) => {
    const regex = {
        $regex: keyword,
        $options: "i"
    };

    const [
        foods,
        restaurants
    ] = await Promise.all([
        Food.find({
            name: regex
        })
            .select("_id name restaurant image price")
            .limit(5),

        Restaurant.find({
            $or: [
                { name: regex },
                { cuisine: regex }
            ]
        })
            .select("_id name cuisine slug")
            .limit(5)
    ]);

    const cuisines = [
        ...new Set(
            restaurants
                .flatMap(restaurant => restaurant.cuisine)
                .filter(cuisine =>
                    cuisine
                        .toLowerCase()
                        .includes(keyword.toLowerCase())
                )
        )
    ].slice(0, 5);

    return {
        foods,
        restaurants,
        cuisines
    };
};

export const searchRestaurants = async (query: any) => {
    const {
        cuisine,
        food
    } = query;

    const filter: Record<string, any> = {};

    if (cuisine) {
        filter['cuisine'] = {
            $elemMatch: {
                $regex: cuisine,
                $options: "i"
            }
        };
    }

    if (food) {
        const foods = await Food.find({
            name: {
                $regex: food,
                $options: "i"
            },
            isAvailable: true
        }).select("restaurant");

        const restaurantIds = [
            ...new Set(
                foods.map(food =>
                    food.restaurant.toString()
                )
            )
        ];

        filter['_id'] = {
            $in: restaurantIds
        };
    }

    return Restaurant.find(filter);
};