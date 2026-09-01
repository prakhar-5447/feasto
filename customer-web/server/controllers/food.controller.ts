import {
    Request,
    Response,
    NextFunction
} from 'express';

import {
    AuthRequest
} from '../middlewares/auth.middleware';

import * as foodService
    from '../services/food.service';

import * as restaurantService
    from '../services/restaurant.service';

import * as foodRepo
    from '../repositories/food.repository';

import {
    validateFoodOwnership
} from '../utils/food.helper';

const getUserId = (
    req: AuthRequest
): string =>
    req.user!._id.toString();

const handleFoodError = (
    err: any,
    res: Response,
    next: NextFunction
): void => {
    if (err.message === 'Food not found') {
        res.status(404).json({
            success: false,
            message: err.message,
            data: null
        });
        return;
    }

    if (err.message === 'Restaurant not found') {
        res.status(404).json({
            success: false,
            message: err.message,
            data: null
        });
        return;
    }

    if (
        err.message ===
        'You do not own this restaurant'
    ) {
        res.status(403).json({
            success: false,
            message: err.message,
            data: null
        });
        return;
    }

    next(err);
};

export const addFood = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        if (!req.user) {
            res.status(401).json({
                success: false,
                message: 'Authentication required',
                data: null
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
                message: 'Restaurant not found',
                data: null
            });
            return;
        }

        if (!req.file?.path) {
            res.status(400).json({
                success: false,
                message: 'Food image is required',
                data: null
            });
            return;
        }

        const food =
            await foodService.addFood(
                req.body,
                restaurant._id.toString(),
                req.file.path
            );

        res.status(201).json({
            success: true,
            message: 'Food added successfully',
            data: food
        });
    } catch (err) {
        next(err);
    }
};

export const getRestaurantMenu = async (
    req: Request,
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
                message: 'Restaurant not found',
                data: null
            });
            return;
        }

        const foods =
            await foodService.getRestaurantMenu(
                restaurant._id.toString()
            );

        res.status(200).json({
            success: true,
            message: 'Menu fetched successfully',
            data: foods
        });
    } catch (err) {
        next(err);
    }
};

export const getFood = async (
    req: Request,
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
                message: 'Food not found',
                data: null
            });
            return;
        }

        res.status(200).json({
            success: true,
            message: 'Food fetched successfully',
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
        if (!req.user) {
            res.status(401).json({
                success: false,
                message: 'Authentication required',
                data: null
            });
            return;
        }

        const foodId =
            req.params['id'] as string;

        await validateFoodOwnership(
            foodId,
            getUserId(req)
        );

        const food =
            await foodService.updateFood(
                foodId,
                req.body
            );

        res.status(200).json({
            success: true,
            message: 'Food updated successfully',
            data: food
        });
    } catch (err: any) {
        handleFoodError(
            err,
            res,
            next
        );
    }
};

export const deleteFood = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        if (!req.user) {
            res.status(401).json({
                success: false,
                message: 'Authentication required',
                data: null
            });
            return;
        }

        const foodId =
            req.params['id'] as string;

        await validateFoodOwnership(
            foodId,
            getUserId(req)
        );

        await foodService.deleteFood(
            foodId
        );

        res.status(200).json({
            success: true,
            message: 'Food deleted successfully',
            data: null
        });
    } catch (err: any) {
        handleFoodError(
            err,
            res,
            next
        );
    }
};

export const updateFoodAvailability = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        if (!req.user) {
            res.status(401).json({
                success: false,
                message: 'Authentication required',
                data: null
            });
            return;
        }

        const foodId =
            req.params['id'] as string;

        await validateFoodOwnership(
            foodId,
            getUserId(req)
        );

        const {
            isAvailable
        } = req.body;

        if (
            typeof isAvailable !== 'boolean'
        ) {
            res.status(400).json({
                success: false,
                message: 'isAvailable must be boolean',
                data: null
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
            message: 'Food availability updated successfully',
            data: food
        });
    } catch (err: any) {
        handleFoodError(
            err,
            res,
            next
        );
    }
};

const getSort = (
    value: unknown
): foodRepo.FoodSortOption | undefined => {
    if (
        value === "relevance" ||
        value === "rating" ||
        value === "delivery_time" ||
        value === "distance" ||
        value === "price_low_to_high" ||
        value === "price_high_to_low"
    ) {
        return value;
    }

    return undefined;
};

export const filterFoods = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const query: foodRepo.FoodFilterQuery = {
            food:
                typeof req.query['food'] === "string"
                    ? req.query['food'].trim()
                    : undefined,

            cuisine:
                typeof req.query['cuisine'] === "string"
                    ? req.query['cuisine'].trim()
                    : undefined,

            restaurant:
                typeof req.query['restaurant'] === "string"
                    ? req.query['restaurant'].trim()
                    : undefined,

            veg:
                req.query['veg'] === "true",

            city:
                typeof req.query['city'] === "string"
                    ? req.query['city'].trim()
                    : undefined,

            nonVeg:
                req.query['nonVeg'] === "true",

            egg:
                req.query['egg'] === "true",

            vegan:
                req.query['vegan'] === "true",

            halal:
                req.query['halal'] === "true",

            rating:
                req.query['rating'] !== undefined
                    ? Number(req.query['rating'])
                    : undefined,

            price:
                req.query['price'] === "low" ||
                    req.query['price'] === "medium" ||
                    req.query['price'] === "high"
                    ? req.query['price']
                    : undefined,

            maxDeliveryTime:
                req.query['maxDeliveryTime'] !== undefined
                    ? Number(
                        req.query['maxDeliveryTime']
                    )
                    : undefined,

            maxDistance:
                req.query['maxDistance'] !== undefined
                    ? Number(
                        req.query['maxDistance']
                    )
                    : 5,

            latitude:
                req.query['latitude'] !== undefined
                    ? Number(req.query['latitude'])
                    : undefined,

            longitude:
                req.query['longitude'] !== undefined
                    ? Number(req.query['longitude'])
                    : undefined,

            offers:
                req.query['offers'] === "true",

            openNow:
                req.query['openNow'] === "true",

            sort: getSort(req.query["sort"])
        };

        const foods =
            await foodService.filterFoods(query);

        res.status(200).json({
            success: true,
            message: "Foods fetched successfully",
            data: foods
        });
    } catch (error) {
        next(error);
    }
};