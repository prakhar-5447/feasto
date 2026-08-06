import express from "express";
const router = express.Router();

import * as foodController from "../controllers/food.controller";

import { protect } from '../middlewares/auth.middleware';

import upload from "../middlewares/upload.middleware";

import validate from "../middlewares/validation.middleware";

import { createFoodSchema } from "../validations/food.validation";

router.post(
    "/restaurant/:restaurantId/foods",
    protect,
    validate(createFoodSchema),
    upload.single("image"),
    foodController.addFood
);

router.get(
    "/restaurant/:restaurantId/foods",
    foodController.getRestaurantMenu
);

router.put(
    "/:id",
    protect,
    foodController.updateFood
);

router.delete(
    "/:id",
    protect,
    foodController.deleteFood
);

// router.get(
//     "/:id",
//     protect,
//     foodController.getFood
// );

export default router;