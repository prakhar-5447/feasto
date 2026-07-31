const restaurantRepository = require("../repositories/restaurant.repository");

export const createRestaurant = async (data: any, ownerId: any) => {

    const restaurant = await restaurantRepository.createRestaurant({
        ...data,
        owner: ownerId
    });

    return restaurant;
};

export const getMyRestaurant = async (ownerId: any) => {

    return await restaurantRepository.findByOwner(ownerId);

};

export const getRestaurants = async (query: any) => {

    return await restaurantRepository.getRestaurants(query);

};

export const updateRestaurant = async (restaurantId: any, data: any) => {

    return await restaurantRepository.updateRestaurant(restaurantId, data);

};