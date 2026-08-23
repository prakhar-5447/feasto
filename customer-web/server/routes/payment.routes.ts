import { Router } from 'express';

import * as paymentController
    from '../controllers/payment.controller';

import { protect }
    from '../middlewares/auth.middleware';

const router = Router();


// ======================================================
// CREATE PAYMENT
// POST /api/v1/payments
// ======================================================

router.post(
    '/',
    protect,
    paymentController.createPayment
);


// ======================================================
// VERIFY PAYMENT
// PATCH /api/v1/payments/:orderId/verify
// ======================================================

router.patch(
    '/:id/verify',
    protect,
    paymentController.verifyPayment
);


// ======================================================
// GET PAYMENT BY ORDER
// GET /api/v1/payments/:orderId
// ======================================================

router.get(
    '/:orderId',
    protect,
    paymentController.getPaymentByOrder
);


export default router;