export type FoodType =
    | 'veg'
    | 'nonveg'
    | 'halal'
    | 'egg'
    | 'vegan';

export type SpiceLevel =
    | 'mild'
    | 'medium'
    | 'hot';

export interface MenuItem {
    id: number;
    name: string;
    category: string;
    price: number;
    description: string;
    available: boolean;
    foodType: FoodType;
    bestseller: boolean;
    spiceLevel?: SpiceLevel;
    preparationTime?: number;
}

export type MenuItemFormData =
    Omit<MenuItem, 'id'> & {
        id?: number;
    };