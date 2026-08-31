import {
    Request,
    Response,
    NextFunction
} from 'express';

import { AuthRequest }
    from '../middlewares/auth.middleware';

import * as orderService
    from '../services/order.service';

export const createOrder = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const order =
            await orderService.createOrder(
                req.user!._id.toString(),
                req.body.deliveryAddress
            );

        res.status(201).json({
            success: true,
            message: 'Order created successfully',
            data: order
        });
    } catch (err) {
        next(err);
    }
};

export const getOrder = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const order =
            await orderService.getOrder(
                req.params['id'] as string
            );

        if (!order) {
            res.status(404).json({
                success: false,
                message: 'Order not found',
                data: null
            });
            return;
        }

        res.status(200).json({
            success: true,
            message: 'Order fetched successfully',
            data: order
        });
    } catch (err) {
        next(err);
    }
};

export const getMyOrders = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const orders =
            await orderService.getUserOrders(
                req.user!._id.toString()
            );

        res.status(200).json({
            success: true,
            message: 'Orders fetched successfully',
            data: orders
        });
    } catch (err) {
        next(err);
    }
};