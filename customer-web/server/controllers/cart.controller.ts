import {
    Request,
    Response,
    NextFunction
} from "express";

import { AuthRequest }
    from "../middlewares/auth.middleware";

import * as cartService
    from "../services/cart.service";

export const addToCart = async (
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

        const cart =
            await cartService.addToCart(
                user._id.toString(),
                req.body.foodId,
                req.body.quantity || 1
            );

        res.status(200).json({
            success: true,
            data: cart
        });

    } catch (err) {
        next(err);
    }
};

export const getCart = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
) => {

    try {

        const cart =
            await cartService.getCart(
                req.user!._id.toString()
            );

        res.status(200).json({
            success: true,
            data: cart
        });

    } catch (err) {
        next(err);
    }
};

export const updateCartItem = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
) => {

    try {

        const cart =
            await cartService.updateCartItem(
                req.user!._id.toString(),
                req.params['foodId'] as string,
                req.body.quantity
            );

        res.json({
            success: true,
            data: cart
        });

    } catch (err) {
        next(err);
    }
};

export const removeFromCart = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
) => {

    try {

        const cart =
            await cartService.removeCartItem(
                req.user!._id.toString(),
                req.params['foodId'] as string
            );

        res.json({
            success: true,
            data: cart
        });

    } catch (err) {
        next(err);
    }
};

export const clearCart = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
) => {

    try {

        await cartService.clearCart(
            req.user!._id.toString()
        );

        res.json({
            success: true
        });

    } catch (err) {
        next(err);
    }
};

export const applyCoupon = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
) => {

    try {

        const coupon =
            await cartService.applyCoupon(
                req.user!._id.toString(),
                req.body.code
            );

        res.json({
            success: true,
            data: coupon
        });

    } catch (err) {
        next(err);
    }
};

export const removeCoupon = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
) => {

    try {

        await cartService.removeCoupon(
            req.user!._id.toString()
        );

        res.json({
            success: true
        });

    } catch (err) {
        next(err);
    }
};

export const getCartSummary = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
) => {

    try {

        const summary =
            await cartService.getSummary(
                req.user!._id.toString()
            );

        res.json({
            success: true,
            data: summary
        });

    } catch (err) {
        next(err);
    }
};