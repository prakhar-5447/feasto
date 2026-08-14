import {
    Request,
    Response,
    NextFunction
} from "express";

import {
    AuthRequest
} from "../middlewares/auth.middleware";

import * as restaurantService
    from "../services/restaurant.service";

export const createRestaurant = async (
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

        const imageUrls = req.files
            ? (req.files as Express.Multer.File[]).map(
                (file: any) => file.path
            )
            : [];

        const restaurant =
            await restaurantService.createRestaurant(
                user._id.toString(),
                req.body,
                imageUrls
            );

        res.status(201).json({
            success: true,
            data: restaurant
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

        res.status(200).json({
            success: true,
            data: restaurant
        });
    } catch (error) {
        next(error);
    }
};

export const getNearbyRestaurants = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const longitude =
            Number(req.query['longitude']);

        const latitude =
            Number(req.query['latitude']);

        const maxDistance =
            req.query['maxDistance']
                ? Number(req.query['maxDistance'])
                : undefined;

        if (
            Number.isNaN(longitude) ||
            Number.isNaN(latitude)
        ) {
            res.status(400).json({
                success: false,
                message: "Valid longitude and latitude are required"
            });
            return;
        }

        const restaurants =
            await restaurantService.getNearbyRestaurants(
                longitude,
                latitude,
                maxDistance
            );

        res.status(200).json({
            success: true,
            data: restaurants
        });
    } catch (error) {
        next(error);
    }
};

export const getNearByRestaurant = async (
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

        const longitude =
            Number(req.query['longitude']);

        const latitude =
            Number(req.query['latitude']);

        const maxDistance =
            req.query['maxDistance']
                ? Number(req.query['maxDistance'])
                : undefined;

        if (
            Number.isNaN(longitude) ||
            Number.isNaN(latitude)
        ) {
            res.status(400).json({
                success: false,
                message: "Valid longitude and latitude are required"
            });
            return;
        }

        const restaurants =
            await restaurantService.getNearByRestaurant(
                user._id.toString(),
                longitude,
                latitude,
                maxDistance
            );

        res.status(200).json({
            success: true,
            data: restaurants
        });
    } catch (error) {
        next(error);
    }
};

export const getRestaurantsList = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const restaurants =
            await restaurantService.getRestaurantsList();

        res.status(200).json({
            success: true,
            data: restaurants
        });
    } catch (error) {
        next(error);
    }
};

export const restaurantInfo = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const slug =
            req.params['slug'] as string;

        if (!slug) {
            res.status(400).json({
                success: false,
                message: "Restaurant slug is required"
            });
            return;
        }

        const restaurant =
            await restaurantService.getRestaurantBySlug(slug);

        if (!restaurant) {
            res.status(404).json({
                success: false,
                message: "Restaurant not found"
            });
            return;
        }

        res.status(200).json({
            success: true,
            data: restaurant
        });
    } catch (error) {
        next(error);
    }
};

export const updateRestaurant = async (
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

        const id =
            req.params['id'] as string;

        if (!id) {
            res.status(400).json({
                success: false,
                message: "Restaurant ID is required"
            });
            return;
        }

        const restaurant =
            await restaurantService.getRestaurantInfo(id);

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
                message: "You can only update your own restaurant"
            });
            return;
        }

        const updatedRestaurant =
            await restaurantService.updateRestaurant(
                id,
                req.body
            );

        if (!updatedRestaurant) {
            res.status(404).json({
                success: false,
                message: "Restaurant not found"
            });
            return;
        }

        res.status(200).json({
            success: true,
            data: updatedRestaurant
        });
    } catch (error) {
        next(error);
    }
};

export const deleteRestaurant = async (
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

        const id =
            req.params['id'] as string;

        if (!id) {
            res.status(400).json({
                success: false,
                message: "Restaurant ID is required"
            });
            return;
        }

        const restaurant =
            await restaurantService.getRestaurantInfo(id);

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
                message: "You can only delete your own restaurant"
            });
            return;
        }

        const deletedRestaurant =
            await restaurantService.deleteRestaurant(id);

        if (!deletedRestaurant) {
            res.status(404).json({
                success: false,
                message: "Restaurant not found"
            });
            return;
        }

        res.status(200).json({
            success: true,
            message: "Restaurant deleted successfully"
        });
    } catch (error) {
        next(error);
    }
};
