import * as restaurantRepo from "../repositories/restaurant.repository";
import { createSlug } from "../utils/slug.utils";

export const createRestaurant = async (
    userId: string,
    data: any,
    imagesUrl: string[] = []
) => {
    const restaurant = await restaurantRepo.createRestaurant({
        ...data,
        owner: userId,
        slug: createSlug(data.name),
        images: imagesUrl
    });

    const uniqueSlug =
        `${createSlug(data.name)}-${restaurant._id.toString()}`;

    return restaurantRepo.updateRestaurant(
        restaurant._id.toString(),
        {
            slug: uniqueSlug
        }
    );
};

export const getRestaurant = (slug: string) => {
    return restaurantRepo.findBySlug(slug);
};

export const getRestaurantById = (id: string) => {
    return restaurantRepo.findById(id);
};

export const getMyRestaurant = (userId: string) => {
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

export const getRestaurantBySlug = (slug: string) => {
    return restaurantRepo.findBySlug(slug);
};

export const getRestaurantInfo = (id: string) => {
    return restaurantRepo.findById(id);
};

export const updateRestaurant = (
    id: string,
    data: any
) => {
    return restaurantRepo.updateRestaurant(id, data);
};

export const deleteRestaurant = (id: string) => {
    return restaurantRepo.deleteRestaurant(id);
};