import * as foodRepo from "../repositories/food.repository";

export const getFood = (
    foodId: string
) => {
    return foodRepo.findById(foodId);
};

export const getRestaurantMenu = (
    restaurantId: string
) => {
    return foodRepo.findByRestaurant(
        restaurantId
    );
};

export const addFood = (
    data: any
) => {
    return foodRepo.createFood(data);
};

export const updateFood = (
    foodId: string,
    data: any
) => {
    return foodRepo.updateFood(
        foodId,
        data
    );
};

export const deleteFood = (
    foodId: string
) => {
    return foodRepo.deleteFood(
        foodId
    );
};

export const updateFoodAvailability = (
    foodId: string,
    isAvailable: boolean
) => {
    return foodRepo.updateFoodAvailability(
        foodId,
        isAvailable
    );
};