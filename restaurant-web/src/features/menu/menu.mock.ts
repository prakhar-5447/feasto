import type { MenuItem } from './menu.types';

export const INITIAL_CATEGORIES = [
    'Biryani',
    'Curries',
    'Breads',
    'Beverages',
    'Desserts',
];

export const INITIAL_ITEMS: MenuItem[] = [
    {
        id: 1,
        name: 'Chicken Biryani',
        category: 'Biryani',
        price: 299,
        description:
            'Aromatic basmati rice with tender chicken, saffron & whole spices',
        available: true,
        foodType: 'nonveg',
        bestseller: true,
        spiceLevel: 'medium',
        preparationTime: 20,
    },
    {
        id: 2,
        name: 'Mutton Biryani',
        category: 'Biryani',
        price: 380,
        description:
            'Slow-cooked dum biryani with succulent mutton pieces',
        available: true,
        foodType: 'nonveg',
        bestseller: false,
        spiceLevel: 'hot',
        preparationTime: 25,
    },
    {
        id: 3,
        name: 'Veg Biryani',
        category: 'Biryani',
        price: 220,
        description:
            'Fragrant basmati with seasonal vegetables and whole spices',
        available: true,
        foodType: 'veg',
        bestseller: false,
        spiceLevel: 'mild',
        preparationTime: 18,
    },
    {
        id: 4,
        name: 'Butter Chicken',
        category: 'Curries',
        price: 360,
        description:
            'Tender chicken in rich tomato-cashew gravy',
        available: true,
        foodType: 'nonveg',
        bestseller: true,
        spiceLevel: 'mild',
        preparationTime: 15,
    },
    {
        id: 5,
        name: 'Paneer Butter Masala',
        category: 'Curries',
        price: 300,
        description:
            'Cottage cheese cubes in makhani gravy',
        available: true,
        foodType: 'veg',
        bestseller: false,
        spiceLevel: 'mild',
        preparationTime: 12,
    },
    {
        id: 6,
        name: 'Dal Makhani',
        category: 'Curries',
        price: 240,
        description:
            'Black lentils slow-cooked overnight with butter and cream',
        available: false,
        foodType: 'veg',
        bestseller: false,
        spiceLevel: 'mild',
        preparationTime: 10,
    },
    {
        id: 7,
        name: 'Butter Naan',
        category: 'Breads',
        price: 45,
        description:
            'Leavened flatbread from the tandoor, finished with butter',
        available: true,
        foodType: 'veg',
        bestseller: false,
        preparationTime: 8,
    },
    {
        id: 8,
        name: 'Garlic Naan',
        category: 'Breads',
        price: 55,
        description:
            'Naan topped with minced garlic and fresh coriander',
        available: true,
        foodType: 'veg',
        bestseller: true,
        preparationTime: 8,
    },
    {
        id: 9,
        name: 'Sweet Lassi',
        category: 'Beverages',
        price: 90,
        description:
            'Chilled blended yogurt with sugar and cardamom',
        available: true,
        foodType: 'veg',
        bestseller: false,
        preparationTime: 5,
    },
    {
        id: 10,
        name: 'Gulab Jamun',
        category: 'Desserts',
        price: 120,
        description:
            'Soft milk-solid dumplings in rose-flavored sugar syrup',
        available: true,
        foodType: 'veg',
        bestseller: false,
        preparationTime: 5,
    },
];

