import express from "express";
import * as restaurantController from "../controllers/restaurant.controller";
import { protect } from "../middlewares/auth.middleware";
import { role } from "../middlewares/role.middleware";
import validate from "../middlewares/validation.middleware";
import phoneValidation from "../validations/auth.validation";
import { createRestaurantSchema } from "../validations/restaurant.validation";
import upload from "../middlewares/upload.middleware";

const router = express.Router();

router.get("/nearby", restaurantController.getNearbyRestaurants);

router.post(
    "/",
    protect,
    role("restaurant_partner"),
    upload.array("images", 5),
    validate(createRestaurantSchema),
    restaurantController.createRestaurant
);

router.post(
    "/phone-auth",
    phoneValidation,
    restaurantController.restaurantPhoneAuth
);

router.post(
    "/verify-otp",
    restaurantController.restaurantVerifyOtp
);

router.post(
    "/complete-profile",
    restaurantController.restaurantCompleteSignup
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
    "/update",
    protect,
    role("restaurant_partner"),
    restaurantController.updateRestaurant
);

router.delete(
    "/delete",
    protect,
    role("restaurant_partner"),
    restaurantController.deleteRestaurant
);

export default router;