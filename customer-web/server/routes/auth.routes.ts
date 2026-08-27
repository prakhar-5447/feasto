import express from "express";
import * as authController from "../controllers/auth.controller";
import phoneValidation from "../validations/auth.validation";
import { authLimiter } from "../middlewares/rateLimit.middleware";

const router = express.Router();

router.post(
    "/phone-auth",
    authLimiter,
    phoneValidation,
    authController.phoneAuth
);

router.post(
    "/complete-profile",
    authController.completeSignup
);

router.post(
    "/logout",
    authController.logout
);

router.post(
    "/verify-otp",
    authLimiter,
    authController.verifyOtp
);

router.post(
    "/refresh-token",
    authController.refreshToken
);

export default router;