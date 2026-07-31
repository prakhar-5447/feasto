import express from "express";
const router = express.Router();

import { protect } from '../middlewares/auth.middleware';

import {
    getProfile,
    updateProfile,
    deleteProfile
} from '../controllers/user.controller';

router.get('/me', protect, getProfile);
router.put('/me', protect, updateProfile);
router.delete('/me', protect, deleteProfile);

export default router;