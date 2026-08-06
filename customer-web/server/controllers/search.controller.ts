import * as searchService from "../services/search.service";
import { Request, Response, NextFunction } from "express";

export const searchRestaurants = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const result = await searchService.searchRestaurants(req.query);

        res.json({
            success: true,
            count: result.length,
            data: result
        });

    } catch (error) {
        next(error);
    }
};