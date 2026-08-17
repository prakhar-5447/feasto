import Food from "../models/food.model";
import Coupon from "../models/coupon.model";
import * as cartRepo from "../repositories/cart.repository";

const DELIVERY_FEE = 40;
const PLATFORM_FEE = 5;
const GST_RATE = 0.05;

export const addToCart = async (
    userId: string,
    foodId: string,
    quantity: number
) => {

    const food = await Food.findById(foodId);

    if (!food) {
        throw new Error("Food not found");
    }

    let cart =
        await cartRepo.findCartByUser(userId);

    if (!cart) {
        cart = await cartRepo.createCart({
            user: userId,
            restaurant: food.restaurant,
            items: []
        });
    }

    if (
        cart.restaurant &&
        cart.restaurant.toString() !==
        food.restaurant.toString()
    ) {
        throw new Error(
            "Cart contains items from another restaurant"
        );
    }

    const item =
        cart.items.find(
            (i: any) =>
                i.food._id.toString() === foodId
        );

    if (item) {
        item.quantity += quantity;
    } else {
        cart.items.push({
            food: food._id,
            quantity
        } as any);
    }

    await cart.save();

    return cart;
};

export const getCart = async (
    userId: string
) => {

    return cartRepo.findCartByUser(
        userId
    );
};

export const updateCartItem = async (
    userId: string,
    foodId: string,
    quantity: number
) => {

    const cart =
        await cartRepo.findCartByUser(userId);

    if (!cart) {
        throw new Error("Cart not found");
    }

    const item =
        cart.items.find(
            (i: any) =>
                i.food._id.toString() === foodId
        );

    if (!item) {
        throw new Error("Item not found");
    }

    if (quantity <= 0) {
        cart.items =
            cart.items.filter(
                (i: any) =>
                    i.food._id.toString() !== foodId
            );
    } else {
        item.quantity = quantity;
    }

    if (cart.items.length === 0) {
        cart.restaurant = undefined as any;
        cart.couponCode = undefined;
    }

    await cart.save();

    return cart;
};

export const removeCartItem = async (
    userId: string,
    foodId: string
) => {

    const cart =
        await cartRepo.findCartByUser(userId);

    if (!cart) {
        throw new Error("Cart not found");
    }

    cart.items =
        cart.items.filter(
            (i: any) =>
                i.food._id.toString() !== foodId
        );

    await cart.save();

    return cart;
};

export const clearCart = async (
    userId: string
) => {

    const cart =
        await cartRepo.findCartByUser(userId);

    if (!cart) {
        return;
    }

    cart.items = [];
    cart.couponCode = undefined;

    await cart.save();
};

export const applyCoupon = async (
    userId: string,
    code: string
) => {

    const cart =
        await cartRepo.findCartByUser(userId);

    if (!cart) {
        throw new Error("Cart not found");
    }

    const coupon =
        await Coupon.findOne({
            code: code.toUpperCase(),
            isActive: true
        });

    if (!coupon) {
        throw new Error("Invalid coupon");
    }

    cart.couponCode = coupon.code;

    await cart.save();

    return coupon;
};

export const removeCoupon = async (
    userId: string
) => {

    const cart =
        await cartRepo.findCartByUser(userId);

    if (!cart) {
        throw new Error("Cart not found");
    }

    cart.couponCode = undefined;

    await cart.save();
};

export const getSummary = async (
    userId: string
) => {

    const cart =
        await cartRepo.findCartByUser(userId);

    if (!cart) {
        throw new Error("Cart not found");
    }

    let itemTotal = 0;

    for (const item of cart.items as any) {
        itemTotal +=
            item.food.price *
            item.quantity;
    }

    let discount = 0;

    if (cart.couponCode) {

        const coupon =
            await Coupon.findOne({
                code: cart.couponCode
            });

        if (coupon) {

            if (
                coupon.discountType === "flat"
            ) {
                discount =
                    coupon.discount;
            } else {

                discount =
                    (itemTotal *
                        coupon.discount) / 100;

                if (
                    coupon.maxDiscount
                ) {
                    discount = Math.min(
                        discount,
                        coupon.maxDiscount
                    );
                }
            }
        }
    }

    const gst =
        Math.round(
            (itemTotal - discount) *
            GST_RATE
        );

    const grandTotal =
        itemTotal -
        discount +
        gst +
        DELIVERY_FEE +
        PLATFORM_FEE;

    return {
        itemTotal,
        discount,
        deliveryFee: DELIVERY_FEE,
        platformFee: PLATFORM_FEE,
        gstRate: GST_RATE,
        gst,
        grandTotal
    };
};