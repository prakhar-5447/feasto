import { Router } from "express";
import * as paymentController from "../controllers/payment.controller";
import { protect } from "../middlewares/auth.middleware";

const router = Router();

router.post("/", protect, paymentController.createPayment);

router.patch("/:id/verify", protect, paymentController.verifyPayment);

router.get("/:orderId", protect, paymentController.getPaymentByOrder);

export default router;