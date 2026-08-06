import express from "express";
const router = express.Router();

import { protect } from '../middlewares/auth.middleware';

import {
    getProfile,
    updateProfile,
    deleteProfile
} from '../controllers/user.controller';

router.get('/me', protect, getProfile);
router.patch('/me', protect, updateProfile);
router.delete('/me', protect, deleteProfile);
// router.get('/:username', protect, getPublicProfile);
// router.get('/:id/orders', protect, getOrderHistory);
// router.get('/:id/reviews', protect, getReviewHistory);

export default router;