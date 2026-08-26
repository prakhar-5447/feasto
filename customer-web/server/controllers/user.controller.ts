import {
    Response,
    NextFunction
} from "express";

import {
    AuthRequest
} from "../middlewares/auth.middleware";

import * as userService
    from "../services/user.service";

export const getProfile = async (
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

        const profile =
            await userService.getProfile(
                user._id.toString()
            );

        if (!profile) {
            res.status(404).json({
                success: false,
                message: "User not found"
            });
            return;
        }

        res.status(200).json({
            success: true,
            data: profile
        });
    } catch (err) {
                  next(err);
    }
};

export const updateProfile = async (
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

        const updatedUser =
            await userService.updateProfile(
                user._id.toString(),
                req.body
            );

        if (!updatedUser) {
            res.status(404).json({
                success: false,
                message: "User not found"
            });
            return;
        }

        res.status(200).json({
            success: true,
            data: updatedUser
        });
    } catch (err) {
                  next(err);
    }
};

export const deleteProfile = async (
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

        const deletedUser =
            await userService.deleteProfile(
                user._id.toString()
            );

        if (!deletedUser) {
            res.status(404).json({
                success: false,
                message: "User not found"
            });
            return;
        }

        res.clearCookie("accessToken", {
            httpOnly: true,
            sameSite: "lax",
            secure: process.env['NODE_ENV'] === "production",
            path: "/"
        });

        res.clearCookie("refreshToken", {
            httpOnly: true,
            sameSite: "lax",
            secure: process.env['NODE_ENV'] === "production",
            path: "/"
        });

        res.status(200).json({
            success: true,
            message: "Account deleted successfully"
        });
    } catch (err) {
                  next(err);
    }
};

export const getPublicProfile = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const username = req.params['username'] as string;

        if (!username) {
            res.status(400).json({
                success: false,
                message: "Username is required"
            });
            return;
        }

        const user =
            await userService.getPublicProfile(
                username
            );

        if (!user) {
            res.status(404).json({
                success: false,
                message: "User not found"
            });
            return;
        }

        res.status(200).json({
            success: true,
            data: user
        });
    } catch (err) {
                  next(err);
    }
};

export const getOrderHistory = async (
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

        const id = req.params['id'] as string;

        if (!id) {
            res.status(400).json({
                success: false,
                message: "User ID is required"
            });
            return;
        }

        if (user._id.toString() !== id) {
            res.status(403).json({
                success: false,
                message: "You can only access your own orders"
            });
            return;
        }

        const orders =
            await userService.getOrderHistory(id);

        res.status(200).json({
            success: true,
            data: orders
        });
    } catch (err) {
                  next(err);
    }
};

export const getReviewHistory = async (
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

        const id = req.params['id'] as string;

        if (!id) {
            res.status(400).json({
                success: false,
                message: "User ID is required"
            });
            return;
        }

        if (user._id.toString() !== id) {
            res.status(403).json({
                success: false,
                message: "You can only access your own reviews"
            });
            return;
        }

        const reviews =
            await userService.getReviewHistory(id);

        res.status(200).json({
            success: true,
            data: reviews
        });
    } catch (err) {
                  next(err);
    }
};

