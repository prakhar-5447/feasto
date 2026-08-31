import { Request, Response, NextFunction } from 'express';
import * as couponService from '../services/coupon.service';

export const getCoupons = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const coupons =
            await couponService.getCoupons();

        res.status(200).json({
            success: true,
            message: 'Coupons fetched successfully',
            data: coupons
        });
    } catch (err) {
        next(err);
    }
};