import express from "express";

const router = express.Router();

import { protect }
    from "../middlewares/auth.middleware";

import * as cartController
    from "../controllers/cart.controller";

router.post(
    "/items",
    protect,
    cartController.addToCart
);

router.get(
    "/",
    protect,
    cartController.getCart
);

router.patch(
    "/items/:foodId",
    protect,
    cartController.updateCartItem
);

router.delete(
    "/items/:foodId",
    protect,
    cartController.removeFromCart
);

router.delete(
    "/",
    protect,
    cartController.clearCart
);

router.post(
    "/apply-coupon",
    protect,
    cartController.applyCoupon
);

router.delete(
    "/remove-coupon",
    protect,
    cartController.removeCoupon
);

router.get(
    "/summary",
    protect,
    cartController.getCartSummary
);

export default router