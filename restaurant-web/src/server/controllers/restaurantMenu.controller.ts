import { Response, NextFunction } from "express";
import { AuthRequest } from "../middlewares/auth.middleware";

import * as restaurantService
    from "../services/restaurant.service";

import * as foodService
    from "../services/food.service";

import { validateFoodOwnership }
    from "../utils/food.helper";

const getUserId = (
    req: AuthRequest
): string => {
    return req.user!._id.toString();
};

const handleMenuError = (
    err: any,
    res: Response,
    next: NextFunction
) => {
    if (err.message === "Food not found") {
        res.status(404).json({
            success: false,
            message: "Food not found",
            data: null,
        });
        return;
    }

    if (err.message === "Restaurant not found") {
        res.status(404).json({
            success: false,
            message: "Restaurant not found",
            data: null,
        });
        return;
    }

    if (
        err.message ===
        "You do not own this restaurant"
    ) {
        res.status(403).json({
            success: false,
            message:
                "You do not own this restaurant",
            data: null,
        });
        return;
    }

    next(err);
};

export const getMyMenu = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
) => {
    try {
        if (!req.user) {
            res.status(401).json({
                success: false,
                message: "Authentication required",
                data: null,
            });
            return;
        }

        const restaurant =
            await restaurantService.getMyRestaurant(
                getUserId(req)
            );

        if (!restaurant) {
            res.status(404).json({
                success: false,
                message: "Restaurant not found",
                data: null,
            });
            return;
        }

        const foods =
            await foodService.getRestaurantMenu(
                restaurant._id.toString()
            );

        res.status(200).json({
            success: true,
            message: "Menu fetched successfully",
            data: foods,
        });
    } catch (err) {
        handleMenuError(err, res, next);
    }
};

export const addFood = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
) => {
    try {
        if (!req.user) {
            res.status(401).json({
                success: false,
                message: "Authentication required",
                data: null,
            });
            return;
        }

        const restaurant =
            await restaurantService.getMyRestaurant(
                getUserId(req)
            );

        if (!restaurant) {
            res.status(404).json({
                success: false,
                message: "Restaurant not found",
                data: null,
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
            message: "Food added successfully",
            data: food,
        });
    } catch (err) {
        handleMenuError(err, res, next);
    }
};

export const updateFood = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
) => {
    try {
        if (!req.user) {
            res.status(401).json({
                success: false,
                message: "Authentication required",
                data: null,
            });
            return;
        }

        const foodId =
            req.params["foodId"] as string;

        await validateFoodOwnership(
            foodId,
            getUserId(req)
        );

        const food =
            await foodService.updateFood(
                foodId,
                req.body
            );

        if (!food) {
            res.status(404).json({
                success: false,
                message: "Food not found",
                data: null,
            });
            return;
        }

        res.status(200).json({
            success: true,
            message: "Food updated successfully",
            data: food,
        });
    } catch (err) {
        handleMenuError(err, res, next);
    }
};


export const deleteFood = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
) => {
    try {
        if (!req.user) {
            res.status(401).json({
                success: false,
                message: "Authentication required",
                data: null,
            });
            return;
        }

        const foodId =
            req.params["foodId"] as string;

        await validateFoodOwnership(
            foodId,
            getUserId(req)
        );

        await foodService.deleteFood(foodId);

        res.status(200).json({
            success: true,
            message: "Food deleted successfully",
            data: null,
        });
    } catch (err) {
        handleMenuError(err, res, next);
    }
};

export const updateAvailability = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
) => {
    try {
        if (!req.user) {
            res.status(401).json({
                success: false,
                message: "Authentication required",
                data: null,
            });
            return;
        }

        const foodId =
            req.params["foodId"] as string;

        await validateFoodOwnership(
            foodId,
            getUserId(req)
        );

        const {
            isAvailable,
        } = req.body;

        if (
            typeof isAvailable !==
            "boolean"
        ) {
            res.status(400).json({
                success: false,
                message:
                    "isAvailable must be a boolean",
                data: null,
            });
            return;
        }

        const food =
            await foodService.updateFoodAvailability(
                foodId,
                isAvailable
            );

        res.status(200).json({
            success: true,
            message:
                "Food availability updated successfully",
            data: food,
        });
    } catch (err) {
        handleMenuError(err, res, next);
    }
};