import { Request, Response, NextFunction } from "express";
import * as restaurantRepository from "../repositories/restaurant.repository";
import * as restaurantService from "../services/restaurant.service";

interface AuthRequest extends Request {
    user?: {
        id: string;
    };
}

export const getNearbyRestaurants = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const { lat, lng } = req.query;

        const restaurants = await restaurantRepository.findNearbyRestaurants(
            Number(lng),
            Number(lat),
            5000
        );

        res.json({
            success: true,
            data: restaurants,
        });
    } catch (error) {
        next(error);
    }
};

export const createRestaurant = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const restaurant = await restaurantService.createRestaurant(
            { ...req.body },
            req.user!.id
        );

        res.status(201).json({
            success: true,
            data: restaurant,
        });
    } catch (error) {
        next(error);
    }
};

export const getMyRestaurant = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const restaurant = await restaurantService.getMyRestaurant(req.user!.id);

        res.json({
            success: true,
            data: restaurant,
        });
    } catch (error) {
        next(error);
    }
};

export const getRestaurants = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const result = await restaurantService.getRestaurants(req.query);

        res.json({
            success: true,
            total: result.total,
            page: result.page,
            limit: result.limit,
            data: result.restaurants,
        });
    } catch (error) {
        next(error);
    }
};

export const updateRestaurant = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const restaurant = await restaurantService.updateRestaurant(
            req.params["id"],
            req.body
        );

        res.json({
            success: true,
            data: restaurant,
        });
    } catch (error) {
        next(error);
    }
};