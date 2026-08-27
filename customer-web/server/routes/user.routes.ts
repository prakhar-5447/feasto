import express from "express";
import { protect } from "../middlewares/auth.middleware";
import * as userController from "../controllers/user.controller";

const router = express.Router();

router.get("/me", protect, userController.getProfile);
router.patch("/me", protect, userController.updateProfile);
router.delete("/me", protect, userController.deleteProfile);

router.get("/me/orders", protect, userController.getOrderHistory);
router.get("/me/reviews", protect, userController.getReviewHistory);

export default router;