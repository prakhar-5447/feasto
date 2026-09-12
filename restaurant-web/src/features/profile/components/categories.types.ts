export interface Category {
    id: string;
    name: string;
    type: 'food' | 'cuisine';
}

export const RESTAURANT_CATEGORIES: Category[] = [
    {
        id: 'pizza',
        name: 'Pizza',
        type: 'food',
    },
    {
        id: 'burger',
        name: 'Burger',
        type: 'food',
    },
    {
        id: 'biryani',
        name: 'Biryani',
        type: 'food',
    },
    {
        id: 'fast-food',
        name: 'Fast Food',
        type: 'food',
    },
    {
        id: 'rolls',
        name: 'Rolls',
        type: 'food',
    },
    {
        id: 'momos',
        name: 'Momos',
        type: 'food',
    },
    {
        id: 'thali',
        name: 'Thali',
        type: 'food',
    },
    {
        id: 'sandwich',
        name: 'Sandwich',
        type: 'food',
    },
    {
        id: 'noodles',
        name: 'Noodles',
        type: 'food',
    },
    {
        id: 'desserts',
        name: 'Desserts',
        type: 'food',
    },
    {
        id: 'north-indian',
        name: 'North Indian',
        type: 'cuisine',
    },
    {
        id: 'south-indian',
        name: 'South Indian',
        type: 'cuisine',
    },
    {
        id: 'chinese',
        name: 'Chinese',
        type: 'cuisine',
    },
    {
        id: 'italian',
        name: 'Italian',
        type: 'cuisine',
    },
    {
        id: 'cafe',
        name: 'Cafe',
        type: 'cuisine',
    },
];