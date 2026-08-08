import * as restaurantRepo from "../repositories/restaurant.repository";

export const createRestaurant = (
userId: string,
data: any
) => {
    return restaurantRepo.createRestaurant({
        ...data,
        owner: userId
    });
};

export const getRestaurant = (
    restaurantId: string
) => {
    return restaurantRepo.findById(
        restaurantId
    );
};

export const getMyRestaurant = (
userId: string
) => {
    return restaurantRepo.findByOwner(userId);
};

export const getNearbyRestaurants = (
longitude: number,
latitude: number,
maxDistance?: number
) => {
    return restaurantRepo.findNearby(
        longitude,
        latitude,
        maxDistance
    );
};

export const getNearByRestaurant = (
userId: string,
longitude: number,
latitude: number,
maxDistance?: number
) => {
    return restaurantRepo.findNearby(
        longitude,
        latitude,
        maxDistance
    );
};

export const getRestaurantsList = () => {
    return restaurantRepo.findAll();
};

export const getRestaurantInfo = (
id: string
) => {
    return restaurantRepo.findById(id);
};

export const updateRestaurant = (
id: string,
data: any
) => {
    return restaurantRepo.updateRestaurant(
        id,
        data
    );
};

export const deleteRestaurant = (
id: string
) => {
    return restaurantRepo.deleteRestaurant(id);
};
