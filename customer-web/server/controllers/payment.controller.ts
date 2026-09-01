import {
    Request,
    Response,
    NextFunction
} from 'express';

import * as paymentService
    from '../services/payment.service';

import * as cartService
    from '../services/cart.service';

import {
    AuthRequest
} from '../middlewares/auth.middleware';

type PaymentMethod =
    | "upi"
    | "fakeupi"
    | "razorpay"
    | "cod";

export const createPayment = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const {
            orderId,
            method
        } = req.body;

        if (!orderId) {
            res.status(400).json({
                success: false,
                message: 'Order ID is required',
                data: null
            });
            return;
        }

        if (!method) {
            res.status(400).json({
                success: false,
                message: 'Payment method is required',
                data: null
            });
            return;
        }

        const payment =
            await paymentService.createPayment(
                orderId,
                method
            );

        res.status(201).json({
            success: true,
            message: 'Payment created successfully',
            data: payment
        });
    } catch (err) {
        next(err);
    }
};

export const verifyPayment = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const paymentId =
            req.params['id'] as string;

        const method =
            req.query['method'] as PaymentMethod;

        const transactionId =
            req.query['transactionId'] as string;

        if (!paymentId) {
            res.status(400).json({
                success: false,
                message: 'Payment ID is required',
                data: null
            });
            return;
        }

        if (!method) {
            res.status(400).json({
                success: false,
                message: 'Payment method is required',
                data: null
            });
            return;
        }

        if (!transactionId) {
            res.status(400).json({
                success: false,
                message: 'Transaction ID is required',
                data: null
            });
            return;
        }

        const payment =
            await paymentService.verifyPayment(
                paymentId,
                method,
                transactionId
            );

        await cartService.clearCart(
            req.user!._id.toString()
        );

        res.status(200).json({
            success: true,
            message: 'Payment verified successfully',
            data: payment
        });
    } catch (err) {
        next(err);
    }
};

export const getPaymentByOrder = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const payment =
            await paymentService.getPaymentByOrder(
                req.params['orderId'] as string
            );

        if (!payment) {
            res.status(404).json({
                success: false,
                message: 'Payment not found',
                data: null
            });
            return;
        }

        res.status(200).json({
            success: true,
            message: 'Payment fetched successfully',
            data: payment
        });
    } catch (err) {
        next(err);
    }
};