import Coupon from "../models/coupon.model";

export const findAllActiveCoupons = () => {

    return Coupon.find({
        isActive: true
    });
};