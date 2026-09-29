import * as couponRepo from "../repositories/coupon.repository";

export const getCoupons = async () => {
    return couponRepo.findAllActiveCoupons();
};