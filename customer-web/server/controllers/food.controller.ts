import {
    Response,
    NextFunction,
    Request
} from "express";

import {
    AuthRequest
} from "../middlewares/auth.middleware";

import * as foodService
    from "../services/food.service";

import * as restaurantService
    from "../services/restaurant.service";

import { validateFoodOwnership } from "../utils/food.helper";


export const addFood = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const user = req.user;

        if (!user) {
            res.status(401).json({
                success: false,
                message: "Authentication required"
            });
            return;
        }

        const restaurant =
            await restaurantService.getMyRestaurant(
                user._id.toString()
            );

        if (!restaurant) {
            res.status(404).json({
                success: false,
                message: "Restaurant not found"
            });
            return;
        }

        if (!req.file?.path) {
            res.status(400).json({
                success: false,
                message: "Food image is required"
            });
            return;
        }

        const food = await foodService.addFood(
            req.body,
            restaurant._id.toString(),
            req.file?.path
        );

        res.status(201).json({
            success: true,
            data: food
        });

    } catch (err) {
        next(err);
    }
};

export const getRestaurantMenu = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const restaurant =
            await restaurantService.getRestaurant(
                req.params['restaurantSlug'] as string
            );

        if (!restaurant) {
            res.status(404).json({
                success: false,
                message: "Restaurant not found"
            });
            return;
        }

        const foods =
            await foodService.getRestaurantMenu(
                restaurant._id as string
            );

        res.status(200).json({
            success: true,
            data: foods
        });
    } catch (err) {
        next(err);
    }
};

export const getFood = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const food =
            await foodService.getFood(
                req.params['id'] as string
            );

        if (!food) {
            res.status(404).json({
                success: false,
                message: "Food not found"
            });
            return;
        }

        res.status(200).json({
            success: true,
            data: food
        });
    } catch (err) {
        next(err);
    }
};

export const updateFood = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {

        const user = req.user;

        if (!user) {
            res.status(401).json({
                success: false,
                message: "Authentication required"
            });
            return;
        }

        const foodId = req.params["id"] as string;

        await validateFoodOwnership(
            foodId,
            user._id.toString()
        );

        const updatedFood =
            await foodService.updateFood(
                foodId,
                req.body
            );

        res.status(200).json({
            success: true,
            data: updatedFood
        });

    } catch (err: any) {

        if (err.message === "Food not found") {
            res.status(404).json({
                success: false,
                message: err.message
            });
            return;
        }

        if (
            err.message === "Restaurant not found"
        ) {
            res.status(404).json({
                success: false,
                message: err.message
            });
            return;
        }

        if (
            err.message ===
            "You do not own this restaurant"
        ) {
            res.status(403).json({
                success: false,
                message: err.message
            });
            return;
        }

        next(err);
    }
};

export const deleteFood = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {

        const user = req.user;

        if (!user) {
            res.status(401).json({
                success: false,
                message: "Authentication required"
            });
            return;
        }

        const foodId = req.params["id"] as string;

        await validateFoodOwnership(
            foodId,
            user._id.toString()
        );

        await foodService.deleteFood(
            foodId
        );

        res.status(200).json({
            success: true,
            message: "Food deleted successfully"
        });

    } catch (err: any) {

        if (err.message === "Food not found") {
            res.status(404).json({
                success: false,
                message: err.message
            });
            return;
        }

        if (
            err.message ===
            "You do not own this restaurant"
        ) {
            res.status(403).json({
                success: false,
                message: err.message
            });
            return;
        }

        next(err);
    }
};

export const updateFoodAvailability = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {

        const user = req.user;

        if (!user) {
            res.status(401).json({
                success: false,
                message: "Authentication required"
            });
            return;
        }

        const foodId = req.params["id"] as string;

        await validateFoodOwnership(
            foodId,
            user._id.toString()
        );

        const { isAvailable } = req.body;

        if (
            typeof isAvailable !==
            "boolean"
        ) {
            res.status(400).json({
                success: false,
                message:
                    "isAvailable must be boolean"
            });
            return;
        }

        const updatedFood =
            await foodService.updateFoodAvailability(
                foodId,
                isAvailable
            );

        res.status(200).json({
            success: true,
            data: updatedFood
        });

    } catch (err: any) {

        if (err.message === "Food not found") {
            res.status(404).json({
                success: false,
                message: err.message
            });
            return;
        }

        if (
            err.message ===
            "You do not own this restaurant"
        ) {
            res.status(403).json({
                success: false,
                message: err.message
            });
            return;
        }
        next(err);
    }
};

export const filterFoods = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const foods =
            await foodService.filterFoods(
                req.query
            );

        res.status(200).json({
            success: true,
            data: foods
        });

    } catch (err) {
        next(err);
    }
};