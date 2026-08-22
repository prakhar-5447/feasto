import express
    from "express";

import { protect }
    from "../middlewares/auth.middleware";

import * as orderController
    from "../controllers/order.controller";

const router =
    express.Router();

router.post(
    "/",
    protect,
    orderController.createOrder
);

router.get(
    "/my-orders",
    protect,
    orderController.getMyOrders
);

router.get(
    "/:id",
    protect,
    orderController.getOrder
);

export default router;