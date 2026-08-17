import { Request, Response } from "express";
import * as couponService from "../services/coupon.service";

export const getCoupons = async (
    req: Request,
    res: Response
) => {

    const coupons =
        await couponService.getCoupons();

    res.status(200).json({
        success: true,
        count: coupons.length,
        data: coupons
    });
};