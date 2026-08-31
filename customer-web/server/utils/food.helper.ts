import { IFood } from "../models/food.model";
import * as foodService from "../services/food.service";
import * as restaurantService from "../services/restaurant.service";

export const validateFoodOwnership = async (
    foodId: string,
    userId: string
): Promise<IFood> => {
    const food = await foodService.getFood(foodId);

    if (!food) {
        throw new Error("Food not found");
    }

    const restaurant =
        await restaurantService.getRestaurantById(
            food.restaurant.toString()
        );

    if (!restaurant) {
        throw new Error("Restaurant not found");
    }

    if (restaurant.owner.toString() !== userId) {
        throw new Error("You do not own this restaurant");
    }

    return food;
};