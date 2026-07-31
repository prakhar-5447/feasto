import express from "express";
const router = express.Router();

import * as foodController from "../controllers/food.controller";

import { protect } from '../middlewares/auth.middleware';

import upload from "../middlewares/upload.middleware";

import validate from "../middlewares/validation.middleware";

import { createFoodSchema } from "../validations/food.validation";

router.post(
    "/:restaurantId",
    protect,
    validate(createFoodSchema),
    upload.single("image"),
    foodController.addFood
);

router.get(
    "/:restaurantId",
    foodController.getRestaurantMenu
);

router.put(
    "restaurant/item/:id",
    protect,
    foodController.updateFood
);

router.delete(
    "restaurant/item/:id",
    protect,
    foodController.deleteFood
);

export default router;