import { Types } from 'mongoose';

import * as restaurantRepository
    from '@/server/repositories/restaurant.repository';

import type {
    IRestaurant,
} from '@/server/models/restaurant.model';


export const getRestaurantProfile = async (
    ownerId: string,
): Promise<IRestaurant> => {

    if (!Types.ObjectId.isValid(ownerId)) {
        throw new Error('Invalid user ID');
    }

    const restaurant =
        await restaurantRepository.findByOwner(ownerId);

    if (!restaurant) {
        throw new Error('Restaurant not found');
    }

    return restaurant;
};


export const updateRestaurantProfile = async (
    ownerId: string,
    data: Record<string, unknown>,
): Promise<IRestaurant> => {

    if (!Types.ObjectId.isValid(ownerId)) {
        throw new Error('Invalid user ID');
    }

    const updateData: Record<string, unknown> = {};


    /*
     * =====================================
     * BASIC INFORMATION
     * =====================================
     */

    if (typeof data['name'] === 'string') {

        const name = data['name'].trim();

        if (!name) {
            throw new Error(
                'Restaurant name is required',
            );
        }

        updateData['name'] = name;
    }


    if (typeof data['tagline'] === 'string') {
        updateData['tagline'] =
            data['tagline'].trim();
    }


    if (typeof data['description'] === 'string') {
        updateData['description'] =
            data['description'].trim();
    }


    if (data['minOrder'] !== undefined) {

        const minOrder =
            Number(data['minOrder']);

        if (
            !Number.isFinite(minOrder) ||
            minOrder < 0
        ) {
            throw new Error(
                'Minimum order must be a valid number',
            );
        }

        updateData['minOrder'] = minOrder;
    }


    if (data['avgCookTime'] !== undefined) {

        const avgCookTime =
            Number(data['avgCookTime']);

        if (
            !Number.isFinite(avgCookTime) ||
            avgCookTime < 0
        ) {
            throw new Error(
                'Average cook time must be a valid number',
            );
        }

        updateData['avgCookTime'] = avgCookTime;
    }


    /*
     * =====================================
     * CUISINE
     * =====================================
     */

    if (data['cuisine'] !== undefined) {

        if (!Array.isArray(data['cuisine'])) {
            throw new Error(
                'Cuisine must be an array',
            );
        }

        if (
            !data['cuisine'].every(
                (item) =>
                    typeof item === 'string',
            )
        ) {
            throw new Error(
                'Invalid cuisine list',
            );
        }

        updateData['cuisine'] =
            data['cuisine']
                .map(
                    (item) => item.trim(),
                )
                .filter(Boolean);
    }


    /*
     * =====================================
     * CONTACT DETAILS
     * =====================================
     */

    if (typeof data['phone'] === 'string') {
        updateData['phone'] =
            data['phone'].trim();
    }


    if (typeof data['altPhone'] === 'string') {
        updateData['altPhone'] =
            data['altPhone'].trim();
    }


    if (typeof data['email'] === 'string') {
        updateData['email'] =
            data['email']
                .trim()
                .toLowerCase();
    }


    if (typeof data['website'] === 'string') {
        updateData['website'] =
            data['website'].trim();
    }


    if (typeof data['instagram'] === 'string') {
        updateData['instagram'] =
            data['instagram'].trim();
    }


    if (typeof data['facebook'] === 'string') {
        updateData['facebook'] =
            data['facebook'].trim();
    }


    /*
     * =====================================
     * LEGAL & LICENSE
     * =====================================
     */

    if (typeof data['fssai'] === 'string') {

        const fssai =
            data['fssai'].trim();

        if (
            fssai !== '' &&
            !/^\d{14}$/.test(fssai)
        ) {
            throw new Error(
                'FSSAI must contain exactly 14 digits',
            );
        }

        updateData['fssai'] = fssai;
    }


    if (typeof data['gstin'] === 'string') {

        const gstin =
            data['gstin']
                .trim()
                .toUpperCase();

        if (
            gstin !== '' &&
            !/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z][1-9A-Z]Z[0-9A-Z]$/
                .test(gstin)
        ) {
            throw new Error(
                'Invalid GSTIN format',
            );
        }

        updateData['gstin'] = gstin;
    }


    /*
     * =====================================
     * IMPORTANT
     * =====================================
     *
     * Operating hours are NOT updated here.
     *
     * Location is NOT updated here.
     *
     * These remain platform-controlled.
     *
     * Never accept these from frontend:
     *
     * owner
     * location
     * address
     * area
     * city
     * state
     * pincode
     * slug
     * operatingHours
     *
     */


    if (Object.keys(updateData).length === 0) {
        throw new Error(
            'No profile changes provided',
        );
    }


    /*
     * =====================================
     * DATABASE UPDATE
     * =====================================
     */

    const restaurant =
        await restaurantRepository.updateByOwner(
            ownerId,
            updateData as Partial<IRestaurant>,
        );


    if (!restaurant) {
        throw new Error(
            'Restaurant not found',
        );
    }


    return restaurant;
};