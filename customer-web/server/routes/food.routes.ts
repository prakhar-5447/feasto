import express from "express";
import * as foodController from "../controllers/food.controller";
import { protect } from "../middlewares/auth.middleware";
import { role } from "../middlewares/role.middleware";
import upload from "../middlewares/upload.middleware";
import validate from "../middlewares/validation.middleware";
import { createFoodSchema } from "../validations/food.validation";

const router = express.Router();

router.post(
    "/restaurant/menu",
    protect,
    role("RESTAURANT_PARTNER"),
    upload.single("image"),
    validate(createFoodSchema),
    foodController.addFood
);

router.get(
    "/restaurant/:restaurantSlug/foods",
    foodController.getRestaurantMenu
);

router.get("/filter", foodController.filterFoods);
router.get("/:id", foodController.getFood);

router.patch(
    "/:id",
    protect,
    role("RESTAURANT_PARTNER"),
    foodController.updateFood
);

router.delete(
    "/:id",
    protect,
    role("RESTAURANT_PARTNER"),
    foodController.deleteFood
);

router.patch(
    "/:id/availability",
    protect,
    role("RESTAURANT_PARTNER"),
    foodController.updateFoodAvailability
);

export default router;