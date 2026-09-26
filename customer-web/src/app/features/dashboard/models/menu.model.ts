export interface FoodItem {
    _id: string;
    name: string;
    description?: string;
    image?: string;
    price: number;
    foodType: 'veg' | 'egg' | 'non_veg';
    isAvailable: boolean;
    cuisine?: string;
}

export interface MenuCategory {
    name: string;
    items: FoodItem[];
}

export interface RestaurantMenu {
    categories: MenuCategory[];
}