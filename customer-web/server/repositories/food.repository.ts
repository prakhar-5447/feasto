import Food from "../models/food.model";

export const createFood = async (data: any) => {
    return await Food.create(data);
};

export const findByRestaurant = async (restaurantId: string) => {
    return await Food.find({ restaurant: restaurantId });
};

export const findById = async (id: string) => {
    return await Food.findById(id);
};

export const updateFood = async (id: string, data: any) => {
    return await Food.findByIdAndUpdate(id, data, { new: true });
};

export const deleteFood = async (id: string) => {
    return await Food.findByIdAndDelete(id);
};