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
            await restaurantService.getRestaurant(
                req.params['restaurantId'] as string
            );

        if (!restaurant) {
            res.status(404).json({
                success: false,
                message: "Restaurant not found"
            });
            return;
        }

        if (
            restaurant.owner.toString() !==
            user._id.toString()
        ) {
            res.status(403).json({
                success: false,
                message: "You do not own this restaurant"
            });
            return;
        }

        const food =
            await foodService.addFood({
                ...req.body,
                restaurant: restaurant._id,
                image: req.file?.path
            });

        res.status(201).json({
            success: true,
            data: food
        });
    } catch (error) {
        next(error);
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
                req.params['restaurantId'] as string
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
                req.params['restaurantId'] as string
            );

        res.status(200).json({
            success: true,
            data: foods
        });
    } catch (error) {
        next(error);
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
    } catch (error) {
        next(error);
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

        const restaurant =
            await restaurantService.getRestaurant(
                food.restaurant.toString()
            );

        if (!restaurant) {
            res.status(404).json({
                success: false,
                message: "Restaurant not found"
            });
            return;
        }

        if (
            restaurant.owner.toString() !==
            user._id.toString()
        ) {
            res.status(403).json({
                success: false,
                message: "You do not own this restaurant"
            });
            return;
        }

        const updatedFood =
            await foodService.updateFood(
                req.params['id'] as string,
                req.body
            );

        res.status(200).json({
            success: true,
            data: updatedFood
        });
    } catch (error) {
        next(error);
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

        const restaurant =
            await restaurantService.getRestaurant(
                food.restaurant.toString()
            );

        if (!restaurant) {
            res.status(404).json({
                success: false,
                message: "Restaurant not found"
            });
            return;
        }

        if (
            restaurant.owner.toString() !==
            user._id.toString()
        ) {
            res.status(403).json({
                success: false,
                message: "You do not own this restaurant"
            });
            return;
        }

        await foodService.deleteFood(
            req.params['id'] as string
        );

        res.status(200).json({
            success: true,
            message: "Food deleted successfully"
        });
    } catch (error) {
        next(error);
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

        const restaurant =
            await restaurantService.getRestaurant(
                food.restaurant.toString()
            );

        if (!restaurant) {
            res.status(404).json({
                success: false,
                message: "Restaurant not found"
            });
            return;
        }

        if (
            restaurant.owner.toString() !==
            user._id.toString()
        ) {
            res.status(403).json({
                success: false,
                message: "You do not own this restaurant"
            });
            return;
        }

        const {
            isAvailable
        } = req.body;

        if (
            typeof isAvailable !== "boolean"
        ) {
            res.status(400).json({
                success: false,
                message: "isAvailable must be boolean"
            });
            return;
        }

        const updatedFood =
            await foodService.updateFoodAvailability(
                req.params['id'] as string,
                isAvailable
            );

        res.status(200).json({
            success: true,
            data: updatedFood
        });
    } catch (error) {
        next(error);
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

    } catch (error) {
        next(error);
    }
};