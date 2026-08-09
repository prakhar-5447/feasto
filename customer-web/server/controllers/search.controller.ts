import {
    Request,
    Response,
    NextFunction
} from "express";

import * as searchService
from "../services/search.service";

export const searchItems = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const keyword =
            String(req.query['keyword'] || "")
                .trim();

        if (!keyword) {
            res.status(200).json({
                success: true,
                data: {
                    foods: [],
                    restaurants: [],
                    cuisines: []
                }
            });
            return;
        }

        const data =
            await searchService.searchItems(
                keyword
            );

        res.status(200).json({
            success: true,
            data
        });
    } catch (error) {
        next(error);
    }
};

export const searchRestaurants = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const restaurants =
            await searchService.searchRestaurants(req.query);

        res.status(200).json({
            success: true,
            data: restaurants
        });
    } catch (error) {
        next(error);
    }
};