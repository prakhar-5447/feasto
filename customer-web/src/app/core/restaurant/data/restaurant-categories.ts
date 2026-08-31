import { Category } from '../models/category.model';

export const RESTAURANT_CATEGORIES: Category[] = [

    // Food

    {
        id: 'pizza',
        name: 'Pizza',
        icon: '🍕',
        type: 'food'
    },

    {
        id: 'burger',
        name: 'Burger',
        icon: '🍔',
        type: 'food'
    },

    {
        id: 'biryani',
        name: 'Biryani',
        icon: '🍛',
        type: 'food'
    },

    {
        id: 'fast-food',
        name: 'Fast Food',
        icon: '🍟',
        type: 'food'
    },

    {
        id: 'rolls',
        name: 'Rolls',
        icon: '🌯',
        type: 'food'
    },

    {
        id: 'momos',
        name: 'Momos',
        icon: '🥟',
        type: 'food'
    },

    {
        id: 'thali',
        name: 'Thali',
        icon: '🍱',
        type: 'food'
    },

    {
        id: 'sandwich',
        name: 'Sandwich',
        icon: '🥪',
        type: 'food'
    },

    {
        id: 'noodles',
        name: 'Noodles',
        icon: '🍜',
        type: 'food'
    },

    {
        id: 'desserts',
        name: 'Desserts',
        icon: '🍰',
        type: 'food'
    },


    // Cuisine

    {
        id: 'north-indian',
        name: 'North Indian',
        icon: '🍲',
        type: 'cuisine'
    },

    {
        id: 'south-indian',
        name: 'South Indian',
        icon: '🥞',
        type: 'cuisine'
    },

    {
        id: 'chinese',
        name: 'Chinese',
        icon: '🥡',
        type: 'cuisine'
    },

    {
        id: 'italian',
        name: 'Italian',
        icon: '🍝',
        type: 'cuisine'
    },

    {
        id: 'cafe',
        name: 'Cafe',
        icon: '☕',
        type: 'cuisine'
    }

];