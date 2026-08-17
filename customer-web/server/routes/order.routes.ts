import express from "express";
const router = express.Router();

import orderController from "../controllers/order.controller";

import { protect } from '../middlewares/auth.middleware';

router.post(
    "/",
    protect,
    orderController.placeOrder
);

router.get(
    "/",
    protect,
    orderController.getMyOrders
);

// router.get(
//     "/:id",
//     protect,
//     orderController.getOrder
// );

// router.patch(
//     "/:id/cancel",
//     protect,
//     orderController.cancelOrder
// );

export default router;