import type { Restaurant } from './restaurant.types';

let restaurant: Restaurant = {
    id: 'restaurant-001',
    name: 'The Biryani Co.',
    isOpen: true,
    acceptingOrders: true,
};

export function getRestaurant(): Restaurant {
    return restaurant;
}

export function updateRestaurantStatus(
    isOpen: boolean
): Restaurant {
    restaurant = {
        ...restaurant,
        isOpen,
        acceptingOrders: isOpen,
    };

    return restaurant;
}