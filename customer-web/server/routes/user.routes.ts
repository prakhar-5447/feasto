import express from "express";
const router = express.Router();

import { protect } from '../middlewares/auth.middleware';
import * as userController from "../controllers/user.controller";

router.get('/me', protect, userController.getProfile);
router.patch('/me', protect, userController.updateProfile);
router.delete('/me', protect, userController.deleteProfile);
router.get('/:username', protect, userController.getPublicProfile);
router.get('/me/orders', protect, userController.getOrderHistory);
router.get('/me/reviews', protect, userController.getReviewHistory);

export default router;