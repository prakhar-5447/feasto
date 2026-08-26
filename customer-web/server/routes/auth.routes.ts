import express from "express";
const router = express.Router();

import * as authController from "../controllers/auth.controller";
import phoneValidation from '../validations/auth.validation';
import { protect } from "../middlewares/auth.middleware";

router.post('/phone-auth', phoneValidation, authController.phoneAuth);
router.post('/complete-profile', authController.completeSignup);
router.post('/logout', authController.logout);
router.post("/verify-otp", authController.verifyOtp);
router.post("/refresh-token", authController.refreshToken);

export default router;