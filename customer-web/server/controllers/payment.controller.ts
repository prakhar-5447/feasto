import {
    Request,
    Response
} from 'express';

import * as paymentService from '../services/payment.service';
import * as cartService from '../services/cart.service';
import { AuthRequest } from '../middlewares/auth.middleware';


// ======================================================
// CREATE PAYMENT
// POST /api/v1/payments
// ======================================================

export const createPayment =
    async (
        req: Request,
        res: Response
    ) => {

        try {

            const {
                orderId,
                method
            } = req.body;


            if (!orderId) {

                return res.status(400).json({
                    success: false,
                    message: 'Order ID is required'
                });

            }


            if (!method) {

                return res.status(400).json({
                    success: false,
                    message: 'Payment method is required'
                });

            }


            const result =
                await paymentService.createPayment(
                    orderId,
                    method
                );


            return res.status(201).json({

                success: true,

                data: result

            });

        }

        catch (error: any) {

            console.error(
                'Create payment error:',
                error
            );


            return res.status(500).json({

                success: false,

                message: error.message

            });

        }

    };


// ======================================================
// VERIFY PAYMENT
// PATCH /api/v1/payments/:orderId/verify
// ======================================================

export const verifyPayment = async (
    req: AuthRequest,
    res: Response
) => {
    try {

        // Payment ID comes from URL
        const paymentId = req.params['id'] as string;
        const userId = req.user!._id.toString();

        // method + transactionId come from query params
        const method = req.query['method'] as string;
        const transactionId = req.query['transactionId'] as string;


        if (!paymentId) {
            return res.status(400).json({
                success: false,
                message: 'Payment ID is required'
            });
        }


        if (!method) {
            return res.status(400).json({
                success: false,
                message: 'Payment method is required'
            });
        }


        if (!transactionId) {
            return res.status(400).json({
                success: false,
                message: 'Transaction ID is required'
            });
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

        return res.json({
            success: true,
            data: payment
        });

    }

    catch (error: any) {

        console.error(
            'Payment verification error:',
            error
        );

        return res.status(400).json({
            success: false,
            message: error.message
        });

    }
};


// ======================================================
// GET PAYMENT
// GET /api/v1/payments/:orderId
// ======================================================

export const getPaymentByOrder =
    async (
        req: Request,
        res: Response
    ) => {

        try {

            const payment =
                await paymentService.getPaymentByOrder(
                    req.params['orderId'] as string
                );


            return res.json({

                success: true,

                data: payment

            });

        }

        catch (error: any) {

            return res.status(404).json({

                success: false,

                message: error.message

            });

        }

    };