import * as foodRepo from "../repositories/food.repository";

export const getFood = (foodId: string) => {
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
    data: any,
    restaurantId: string,
    imageUrl?: string
) => {
    return foodRepo.createFood({
        ...data,
        restaurant: restaurantId,
        image: imageUrl || ""
    });
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

export const filterFoods = async (
    query: foodRepo.FoodFilterQuery
) => {
    return foodRepo.filterFoods(query);
};