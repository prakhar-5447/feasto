import express from "express";
const router = express.Router();

import orderController from "../controllers/order.controller";

import { protect } from '../middlewares/auth.middleware';

import role from "../middlewares/role.middleware";

router.post(
    "/place",
    protect,
    orderController.placeOrder
);

router.get(
    "/my-orders",
    protect,
    orderController.getUserOrders
);

router.get(
    "/restaurant/:restaurantId",
    protect,
    role("restaurant"),
    orderController.getRestaurantOrders
);

router.put(
    "/:id/status",
    protect,
    role("restaurant"),
    orderController.updateOrderStatus
);

export default router;