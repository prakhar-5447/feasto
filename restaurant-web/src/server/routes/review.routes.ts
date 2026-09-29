import express from "express";
import { protect } from "../middlewares/auth.middleware";
import * as reviewController from "../controllers/review.controller";

const router = express.Router();

router.get(
    "/restaurant/:restaurantId",
    reviewController.getRestaurantReviews
);

router.post(
    "/restaurant/:restaurantId",
    protect,
    reviewController.createReview
);

router.patch(
    "/:id",
    protect,
    reviewController.updateReview
);

router.delete(
    "/:id",
    protect,
    reviewController.deleteReview
);

export default router;