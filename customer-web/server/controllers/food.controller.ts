import { Request, Response, NextFunction } from "express";
import * as foodService from "../services/food.service";

export const addFood = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {

        const food = await foodService.createFood(
            {
                ...req.body,
                image: (req as any).file ? (req as any).file.path : null
            },
            req.params["restaurantId"]
        );

        res.status(201).json({
            success: true,
            data: food
        });

    } catch (error) {
        next(error);
    }
};

export const getRestaurantMenu = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const foods = await foodService.getRestaurantMenu(
            req.params["restaurantId"]
        );

        res.json({
            success: true,
            data: foods
        });
    } catch (error) {
        next(error);
    }
};

export const updateFood = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const food = await foodService.updateFood(
            req.params["id"],
            req.body
        );

        res.json({
            success: true,
            data: food
        });
    } catch (error) {
        next(error);
    }
};

export const deleteFood = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        await foodService.deleteFood(req.params["id"]);

        res.json({
            success: true,
            message: "Food deleted"
        });
    } catch (error) {
        next(error);
    }
};