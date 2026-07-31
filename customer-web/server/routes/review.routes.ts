import express from "express";
const router = express.Router();

import reviewController from "../controllers/review.controller";

import { protect } from '../middlewares/auth.middleware';

import validate from "../middlewares/validation.middleware";

const { reviewSchema } =
    require("../validations/review.validation");

router.post(
    "/:restaurantId",
    protect,
    validate(reviewSchema),
    reviewController.createReview
);

router.get(
    "/restaurant/:restaurantId",
    reviewController.getRestaurantReviews
);

router.put(
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