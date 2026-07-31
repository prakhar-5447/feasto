import * as foodRepository from "../repositories/food.repository";

export const createFood = async (data: any, restaurantId: any) => {

    const food = await foodRepository.createFood({
        ...data,
        restaurant: restaurantId
    });

    return food;
};

export const getRestaurantMenu = async (restaurantId: any) => {

    return await foodRepository.findByRestaurant(restaurantId);

};

export const updateFood = async (foodId: any, data: any) => {

    return await foodRepository.updateFood(foodId, data);

};

export const deleteFood = async (foodId: any) => {

    return await foodRepository.deleteFood(foodId);

};