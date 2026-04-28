import express from "express";
const router = express.Router();

import * as restaurantController from "../controllers/restaurant.controller";

import { protect } from '../middlewares/auth.middleware';

import role from "../middlewares/role.middleware";

import validate from "../middlewares/validation.middleware";

import { createRestaurantSchema } from "../validations/restaurant.validation";

router.get("/nearby", restaurantController.getNearbyRestaurants);

router.post(
    "/",
    protect,
    role("restaurant_partner"),
    validate(createRestaurantSchema),
    restaurantController.createRestaurant
);

router.get(
    "/my",
    protect,
    role("restaurant_partner"),
    restaurantController.getMyRestaurant
);

router.put(
    "/:id",
    protect,
    role("restaurant_partner"),
    restaurantController.updateRestaurant
);

router.get(
    "/",
    restaurantController.getRestaurants
);

export default router;