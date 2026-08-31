import {
    Request,
    Response,
    NextFunction
} from "express";

import { AuthRequest } from "../middlewares/auth.middleware";
import * as authService from "../services/auth.service";
import * as restaurantService from "../services/restaurant.service";

import {
    generateToken,
    generateRefreshToken
} from "../utils/token.utils";

const otpStore = new Map<
    string,
    {
        otp: string;
        expiresAt: number;
    }
>();

const generateOtp = (): string => {
    return Math.floor(
        100000 + Math.random() * 900000
    ).toString();
};

const accessTokenCookieOptions = {
    httpOnly: true,
    sameSite: "lax" as const,
    secure: process.env["NODE_ENV"] === "production",
    path: "/",
    maxAge: 15 * 60 * 1000
};

const refreshTokenCookieOptions = {
    httpOnly: true,
    sameSite: "lax" as const,
    secure: process.env["NODE_ENV"] === "production",
    path: "/api/v1/auth",
    maxAge: 7 * 24 * 60 * 60 * 1000
};

export const restaurantPhoneAuth = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const { phone } = req.body;

        const { user } =
            await authService.phoneAuth(phone);

        if (!user) {
            res.status(404).json({
                success: false,
                message: "Restaurant account not found"
            });
            return;
        }

        if (user.role !== "RESTAURANT_PARTNER") {
            res.status(403).json({
                success: false,
                message: "Only restaurant partners can login here"
            });
            return;
        }

        const otp = generateOtp();

        otpStore.set(phone, {
            otp,
            expiresAt: Date.now() + 5 * 60 * 1000
        });

        res.status(200).json({
            success: true,
            message: "OTP sent successfully",
            data: {
                otp
            }
        });
    } catch (err) {
        next(err);
    }
};

export const restaurantVerifyOtp = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const { phone, otp } = req.body;
        const record = otpStore.get(phone);

        if (!record) {
            res.status(400).json({
                success: false,
                message: "OTP not found or expired"
            });
            return;
        }

        if (record.expiresAt < Date.now()) {
            otpStore.delete(phone);

            res.status(400).json({
                success: false,
                message: "OTP expired"
            });
            return;
        }

        if (record.otp !== otp) {
            res.status(400).json({
                success: false,
                message: "Invalid OTP"
            });
            return;
        }

        otpStore.delete(phone);

        const { user } =
            await authService.phoneAuth(phone);

        if (!user) {
            res.status(200).json({
                success: true,
                message: "OTP verified",
                data: {
                    isNewUser: true
                }
            });
            return;
        }

        if (user.role !== "RESTAURANT_PARTNER") {
            res.status(403).json({
                success: false,
                message: "Only restaurant partners can login here"
            });
            return;
        }

        const accessToken =
            generateToken(user);

        const refreshToken =
            generateRefreshToken(user);

        res.cookie(
            "accessToken",
            accessToken,
            accessTokenCookieOptions
        );

        res.cookie(
            "refreshToken",
            refreshToken,
            refreshTokenCookieOptions
        );

        res.status(200).json({
            success: true,
            message: "Login successful",
            data: {
                user,
                isNewUser: false
            }
        });
    } catch (err) {
        next(err);
    }
};

export const restaurantCompleteSignup = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const { phone } = req.body;

        const { user } =
            await authService.phoneAuth(phone);

        if (user) {
            res.status(400).json({
                success: false,
                message: "User already exists"
            });
            return;
        }

        const newUser =
            await authService.completeSignup({
                ...req.body,
                role: "RESTAURANT_PARTNER"
            });

        const accessToken =
            generateToken(newUser);

        const refreshToken =
            generateRefreshToken(newUser);

        res.cookie(
            "accessToken",
            accessToken,
            accessTokenCookieOptions
        );

        res.cookie(
            "refreshToken",
            refreshToken,
            refreshTokenCookieOptions
        );

        res.status(201).json({
            success: true,
            message: "Restaurant account created successfully",
            data: newUser
        });
    } catch (err) {
        next(err);
    }
};

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

        const existingRestaurant =
            await restaurantService.getMyRestaurant(
                user._id.toString()
            );

        if (existingRestaurant) {
            res.status(400).json({
                success: false,
                message: "Restaurant already exists"
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
            message: "Restaurant created successfully",
            data: restaurant
        });
    } catch (err) {
        next(err);
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
    } catch (err) {
        next(err);
    }
};

export const getNearbyRestaurants = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const longitude =
            Number(req.query["longitude"]);

        const latitude =
            Number(req.query["latitude"]);

        const maxDistance =
            req.query["maxDistance"]
                ? Number(req.query["maxDistance"])
                : undefined;

        if (
            Number.isNaN(longitude) ||
            Number.isNaN(latitude)
        ) {
            res.status(400).json({
                success: false,
                message:
                    "Valid longitude and latitude are required"
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
    } catch (err) {
        next(err);
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
            Number(req.query["longitude"]);

        const latitude =
            Number(req.query["latitude"]);

        const maxDistance =
            req.query["maxDistance"]
                ? Number(req.query["maxDistance"])
                : undefined;

        if (
            Number.isNaN(longitude) ||
            Number.isNaN(latitude)
        ) {
            res.status(400).json({
                success: false,
                message:
                    "Valid longitude and latitude are required"
            });
            return;
        }

        const restaurants =
            await restaurantService.getNearByRestaurant(
                longitude,
                latitude,
                maxDistance
            );

        res.status(200).json({
            success: true,
            data: restaurants
        });
    } catch (err) {
        next(err);
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
    } catch (err) {
        next(err);
    }
};

export const restaurantInfo = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const slug =
            req.params["slug"] as string;

        if (!slug) {
            res.status(400).json({
                success: false,
                message: "Restaurant slug is required"
            });
            return;
        }

        const restaurant =
            await restaurantService.getRestaurantBySlug(
                slug
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
    } catch (err) {
        next(err);
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

        const updatedRestaurant =
            await restaurantService.updateRestaurant(
                restaurant._id.toString(),
                req.body
            );

        res.status(200).json({
            success: true,
            message: "Restaurant updated successfully",
            data: updatedRestaurant
        });
    } catch (err) {
        next(err);
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

        await restaurantService.deleteRestaurant(
            restaurant._id.toString()
        );

        res.status(200).json({
            success: true,
            message: "Restaurant deleted successfully"
        });
    } catch (err) {
        next(err);
    }
};