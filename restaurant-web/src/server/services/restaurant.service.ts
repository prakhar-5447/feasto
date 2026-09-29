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

export const getRestaurantBySlug = async (
    slug: string
): Promise<restaurantRepo.RestaurantDetail | null> => {
    const restaurant =
        await restaurantRepo.findBySlug(slug);

    if (!restaurant) {
        return null;
    }

    return {
        _id: restaurant._id.toString(),

        name: restaurant.name,

        restaurant: {
            _id: restaurant._id.toString(),
            name: restaurant.name,
            slug: restaurant.slug
        },

        images:
            restaurant.images ?? [],

        cuisine:
            restaurant.cuisine ?? "",

        pricing: {
            priceForTwo:
                restaurant.priceForTwo ?? 0
        },

        rating: {
            average:
                restaurant.avgRating ?? 0,

            totalReviews:
                restaurant.totalReviews ?? 0
        },

        delivery: {
            estimatedTime:
                restaurant.estimatedDeliveryTime ?? 0
        },

        location: {
            city:
                restaurant.city ?? "",

            area:
                restaurant.area ?? "",

            address:
                restaurant.address ?? "",

            coordinates: [
                restaurant.location?.coordinates?.[0] ?? 0,
                restaurant.location?.coordinates?.[1] ?? 0
            ]
        },

        hours: {
            open:
                restaurant.openTime ?? 0,

            close:
                restaurant.closeTime ?? 0
        },

        isAvailable:
            restaurant.isOpen ?? false,

        ...(restaurant.offer
            ? {
                offer: restaurant.offer
            }
            : {}),

        isVeg:
            restaurant.isVeg ?? false
    };
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