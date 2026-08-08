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

// router.get(
//     "/",
//     protect,
//     cartController.getCart
// );

// router.patch(
//     "/items/:foodId",
//     protect,
//     cartController.updateCartItem
// );

// router.delete(
//     "/items/:foodId",
//     protect,
//     cartController.removeFromCart
// );

// router.delete(
//     "/",
//     protect,
//     cartController.clearCart
// );

export default router;