import express from "express";
import * as couponController from "../controllers/coupon.controller";

const router = express.Router();

router.get("/", couponController.getCoupons);

export default router;