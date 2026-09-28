export type FoodType =
    | "veg"
    | "non_veg"
    | "egg";

export type SpiceLevel =
    | "mild"
    | "medium"
    | "hot";

export interface MenuItem {
    id: string;
    name: string;
    category: string;
    price: number;
    description: string;
    image: string;
    available: boolean;
    foodType: FoodType;
    vegan: boolean;
    halal: boolean;
    bestseller: boolean;
    spiceLevel: SpiceLevel;
    preparationTime: number;
    rating: number;
    totalReviews: number;
}

export type MenuItemFormData = Omit<
    MenuItem,
    "id" | "rating" | "totalReviews"
> & {
    id?: string;
};