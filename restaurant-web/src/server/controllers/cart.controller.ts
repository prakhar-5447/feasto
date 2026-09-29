import {
    Response,
    NextFunction
} from 'express';

import { AuthRequest }
    from '../middlewares/auth.middleware';

import * as cartService
    from '../services/cart.service';

const getUserId = (req: AuthRequest): string =>
    req.user!._id.toString();

export const addToCart = async (
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

        const cart =
            await cartService.addToCart(
                getUserId(req),
                req.body.foodId,
                req.body.quantity || 1
            );

        res.status(200).json({
            success: true,
            message: 'Item added to cart',
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
): Promise<void> => {
    try {
        const cart =
            await cartService.getCart(
                getUserId(req)
            );

        res.status(200).json({
            success: true,
            message: 'Cart fetched successfully',
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
): Promise<void> => {
    try {
        const cart =
            await cartService.updateCartItem(
                getUserId(req),
                req.params['foodId'] as string,
                req.body.quantity
            );

        res.json({
            success: true,
            message: 'Cart updated successfully',
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
): Promise<void> => {
    try {
        const cart =
            await cartService.removeCartItem(
                getUserId(req),
                req.params['foodId'] as string
            );

        res.json({
            success: true,
            message: 'Item removed from cart',
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
): Promise<void> => {
    try {
        await cartService.clearCart(
            getUserId(req)
        );

        res.json({
            success: true,
            message: 'Cart cleared successfully',
            data: null
        });
    } catch (err) {
        next(err);
    }
};

export const applyCoupon = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const coupon =
            await cartService.applyCoupon(
                getUserId(req),
                req.body.code
            );

        res.json({
            success: true,
            message: 'Coupon applied successfully',
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
): Promise<void> => {
    try {
        await cartService.removeCoupon(
            getUserId(req)
        );

        res.json({
            success: true,
            message: 'Coupon removed successfully',
            data: null
        });
    } catch (err) {
        next(err);
    }
};

export const getCartSummary = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const summary =
            await cartService.getSummary(
                getUserId(req)
            );

        res.json({
            success: true,
            message: 'Cart summary fetched successfully',
            data: summary
        });
    } catch (err) {
        next(err);
    }
};