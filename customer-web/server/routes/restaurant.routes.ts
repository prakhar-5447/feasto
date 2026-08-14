import express from "express";
const router = express.Router();

import * as restaurantController from "../controllers/restaurant.controller";

import { protect } from "../middlewares/auth.middleware";

import { role } from "../middlewares/role.middleware";

import validate from "../middlewares/validation.middleware";

import { createRestaurantSchema } from "../validations/restaurant.validation";
import upload from "../middlewares/upload.middleware";

router.get("/nearby", restaurantController.getNearbyRestaurants);

router.post(
    "/",
    protect,
    role("restaurant_partner"),
    upload.array("images", 5),
    validate(createRestaurantSchema),
    restaurantController.createRestaurant
);

router.get(
    "/my",
    protect,
    role("restaurant_partner"),
    restaurantController.getMyRestaurant
);

router.get(
    "/restaurants/nearby",
    protect,
    restaurantController.getNearByRestaurant
);

router.get(
    "/get-restaurant-list",
    restaurantController.getRestaurantsList
);

router.get(
    "/slug/:slug",
    restaurantController.restaurantInfo
);

router.patch(
    "/:id",
    protect,
    role("restaurant_partner"),
    restaurantController.updateRestaurant
);

router.delete(
    "/:id",
    protect,
    role("restaurant_partner"),
    restaurantController.deleteRestaurant
);

export default router;
