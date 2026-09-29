import { Types } from "mongoose";

import * as foodRepo from "../repositories/food.repository";

interface FoodFormData {
    name: string;
    category: string;
    price: number | string;
    description?: string;
    cuisine?: string;

    foodType:
    | "veg"
    | "non_veg"
    | "egg";

    vegan?: boolean;
    halal?: boolean;

    spiceLevel?:
    | "mild"
    | "medium"
    | "hot";

    preparationTime?: number | string;

    available?: boolean;
    bestseller?: boolean;
}

export const addFood = async (
    data: FoodFormData,
    restaurantId: string,
    imageUrl?: string
) => {
    if (
        !Types.ObjectId.isValid(
            restaurantId
        )
    ) {
        throw new Error(
            "Invalid restaurant ID"
        );
    }

    return foodRepo.createFood({
        restaurant:
            new Types.ObjectId(
                restaurantId
            ),

        name: data.name.trim(),

        category:
            data.category.trim(),

        price: Number(data.price),

        description:
            data.description?.trim() ?? "",

        cuisine:
            data.cuisine?.trim() ?? "",

        foodType: data.foodType,

        isVegan:
            Boolean(data.vegan),

        isHalal:
            Boolean(data.halal),

        spiceLevel:
            data.spiceLevel ?? "mild",

        preparationTime:
            Number(
                data.preparationTime
            ) || 15,

        isAvailable:
            data.available !== undefined
                ? Boolean(data.available)
                : true,

        isFeatured:
            data.bestseller !== undefined
                ? Boolean(data.bestseller)
                : false,

        image:
            imageUrl ?? "",
    });
};

export const updateFood = async (
    foodId: string,
    data: Partial<FoodFormData>
) => {
    const updateData: Record<
        string,
        unknown
    > = {};

    if (data.name !== undefined) {
        updateData.name =
            data.name.trim();
    }

    if (data.category !== undefined) {
        updateData.category =
            data.category.trim();
    }

    if (data.price !== undefined) {
        updateData.price =
            Number(data.price);
    }

    if (
        data.description !== undefined
    ) {
        updateData.description =
            data.description.trim();
    }

    if (data.cuisine !== undefined) {
        updateData.cuisine =
            data.cuisine.trim();
    }

    if (
        data.foodType !== undefined
    ) {
        updateData.foodType =
            data.foodType;
    }

    if (data.vegan !== undefined) {
        updateData.isVegan =
            Boolean(data.vegan);
    }

    if (data.halal !== undefined) {
        updateData.isHalal =
            Boolean(data.halal);
    }

    if (
        data.spiceLevel !== undefined
    ) {
        updateData.spiceLevel =
            data.spiceLevel;
    }

    if (
        data.preparationTime !==
        undefined
    ) {
        updateData.preparationTime =
            Number(
                data.preparationTime
            );
    }

    if (
        data.available !== undefined
    ) {
        updateData.isAvailable =
            Boolean(data.available);
    }

    if (
        data.bestseller !== undefined
    ) {
        updateData.isFeatured =
            Boolean(data.bestseller);
    }

    return foodRepo.updateFood(
        foodId,
        updateData
    );
};

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