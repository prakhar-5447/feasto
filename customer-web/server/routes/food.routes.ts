import express from "express";
const router = express.Router();

import * as foodController from "../controllers/food.controller";

import { protect } from "../middlewares/auth.middleware";

import { role } from "../middlewares/role.middleware";

import upload from "../middlewares/upload.middleware";

import validate from "../middlewares/validation.middleware";

import { createFoodSchema } from "../validations/food.validation";

router.post(
    "/restaurant/:restaurantId/foods",
    protect,
    role("restaurant_partner"),
    validate(createFoodSchema),
    upload.single("image"),
    foodController.addFood
);

router.get(
    "/restaurant/:restaurantId/foods",
    foodController.getRestaurantMenu
);

router.get(
    "/:id",
    foodController.getFood
);

router.patch(
    "/:id",
    protect,
    role("restaurant_partner"),
    foodController.updateFood
);

router.delete(
    "/:id",
    protect,
    role("restaurant_partner"),
    foodController.deleteFood
);

router.patch(
    "/:id/availability",
    protect,
    role("restaurant_partner"),
    foodController.updateFoodAvailability
);

export default router;