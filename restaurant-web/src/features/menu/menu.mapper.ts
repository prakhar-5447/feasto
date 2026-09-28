import type { MenuItem } from "./menu.types";

interface FoodApiItem {
    _id: string;

    name: string;
    image?: string;
    description?: string;

    category: string;
    cuisine?: string;

    price: number;

    foodType:
    | "veg"
    | "non_veg"
    | "egg";

    isVegan: boolean;
    isHalal: boolean;

    spiceLevel:
    | "mild"
    | "medium"
    | "hot";

    preparationTime: number;

    isAvailable: boolean;
    isFeatured: boolean;

    rating: number;
    totalReviews: number;
}

export const mapFoodToMenuItem = (
    food: FoodApiItem
): MenuItem => ({
    id: food._id,

    name: food.name,
    category: food.category,

    price: food.price,
    description: food.description ?? "",
    image: food.image ?? "",

    available: food.isAvailable,

    foodType: food.foodType,

    vegan: food.isVegan,
    halal: food.isHalal,

    bestseller: food.isFeatured,

    spiceLevel: food.spiceLevel,
    preparationTime: food.preparationTime,

    rating: food.rating,
    totalReviews: food.totalReviews,
});