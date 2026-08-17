import express from "express";

const router = express.Router();

import { protect }
from "../middlewares/auth.middleware";

import * as reviewController
from "../controllers/review.controller";

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