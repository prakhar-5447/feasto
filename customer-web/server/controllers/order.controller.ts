import {
    Request,
    Response,
    NextFunction
} from "express";

import { AuthRequest }
    from "../middlewares/auth.middleware";

import *as orderService
    from "../services/order.service";

export const createOrder =
    async (
        req: AuthRequest,
        res: Response,
        next: NextFunction
    ) => {

        try {

            const order =
                await orderService.createOrder(
                    req.user!._id.toString(),
                    req.body.deliveryAddress
                );

            res.status(201).json({
                success: true,
                data: order
            });

        } catch (err) {
                    next(err);
        }
    };


export const getOrder =
    async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {

        try {

            const order =
                await orderService.getOrder(
                    req.params['id'] as string
                );

            res.json({
                success: true,
                data: order
            });

        } catch (err) {
                    next(err);
        }
    };

export const getMyOrders =
    async (
        req: AuthRequest,
        res: Response,
        next: NextFunction
    ) => {

        try {

            const orders =
                await orderService.getUserOrders(
                    req.user!._id.toString()
                );

            res.json({
                success: true,
                data: orders
            });

        } catch (err) {
                    next(err);
        }
    };