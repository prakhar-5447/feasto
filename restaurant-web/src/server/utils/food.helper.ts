import Food from "../models/food.model";
import Restaurant from "../models/restaurant.model";

export const validateFoodOwnership =
    async (
        foodId: string,
        userId: string
    ) => {
        const food =
            await Food.findById(
                foodId
            );

        if (!food) {
            throw new Error(
                "Food not found"
            );
        }

        const restaurant =
            await Restaurant.findOne({
                _id: food.restaurant,
                owner: userId,
            });

        if (!restaurant) {
            throw new Error(
                "You do not own this restaurant"
            );
        }

        return food;
    };