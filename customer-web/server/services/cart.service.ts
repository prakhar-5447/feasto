import Food from "../models/food.model";
import Coupon from "../models/coupon.model";
import * as cartRepo from "../repositories/cart.repository";

const DELIVERY_FEE = 40;
const PLATFORM_FEE = 5;
const GST_RATE = 0.05;

const getCartOrThrow = async (userId: string) => {
    const cart = await cartRepo.findCartByUser(userId);

    if (!cart) {
        throw new Error("Cart not found");
    }

    return cart;
};

const resetEmptyCart = (cart: any) => {
    if (!cart.items.length) {
        cart.restaurant = undefined;
        cart.couponCode = undefined;
    }
};

export const addToCart = async (
    userId: string,
    foodId: string,
    quantity: number
) => {
    if (!Number.isInteger(quantity) || quantity <= 0) {
        throw new Error("Quantity must be greater than 0");
    }

    const food = await Food.findById(foodId);

    if (!food) {
        throw new Error("Food not found");
    }

    let cart = await cartRepo.findCartByUser(userId);

    if (!cart) {
        cart = await cartRepo.createCart({
            user: userId,
            restaurant: food.restaurant,
            items: []
        });
    }

    if (cart.items.length) {
        if (cart.restaurant?.toString() !== food.restaurant.toString()) {
            throw new Error("Cart contains items from another restaurant");
        }
    } else {
        cart.restaurant = food.restaurant;
        cart.couponCode = undefined;
    }

    const item = cart.items.find(
        (item: any) => item.food.toString() === foodId
    );

    if (item) {
        item.quantity += quantity;
    } else {
        cart.items.push({
            food: food._id,
            quantity
        });
    }

    await cart.save();

    return cart;
};

export const getCart = async (userId: string) => {
    return getCartOrThrow(userId);
};

export const updateCartItem = async (
    userId: string,
    foodId: string,
    quantity: number
) => {
    const cart = await getCartOrThrow(userId);

    const item = cart.items.find(
        (item: any) => item.food._id.toString() === foodId
    );

    if (!item) {
        throw new Error("Item not found");
    }

    if (quantity <= 0) {
        cart.items = cart.items.filter(
            (item: any) => item.food._id.toString() !== foodId
        );
    } else {
        item.quantity = quantity;
    }

    resetEmptyCart(cart);

    await cart.save();

    return cart;
};

export const removeCartItem = async (
    userId: string,
    foodId: string
) => {
    const cart = await getCartOrThrow(userId);

    cart.items = cart.items.filter(
        (item: any) => item.food._id.toString() !== foodId
    );

    resetEmptyCart(cart);

    await cart.save();

    return cart;
};

export const clearCart = async (userId: string) => {
    const cart = await cartRepo.deleteCart(userId);

    if (!cart) {
        throw new Error("Cart not found");
    }

    return cart;
};

export const applyCoupon = async (
    userId: string,
    code: string
) => {
    const cart = await getCartOrThrow(userId);

    const coupon = await Coupon.findOne({
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

export const removeCoupon = async (userId: string) => {
    const cart = await getCartOrThrow(userId);

    cart.couponCode = undefined;

    await cart.save();
};

export const getSummary = async (userId: string) => {
    const cart = await getCartOrThrow(userId);

    const itemTotal = cart.items.reduce(
        (total: number, item: any) =>
            total + item.food.price * item.quantity,
        0
    );

    let discount = 0;

    if (cart.couponCode) {
        const coupon = await Coupon.findOne({
            code: cart.couponCode,
            isActive: true
        });

        if (coupon) {
            discount =
                coupon.discountType === "flat"
                    ? coupon.discount
                    : (itemTotal * coupon.discount) / 100;

            if (
                coupon.discountType === "percentage" &&
                coupon.maxDiscount
            ) {
                discount = Math.min(
                    discount,
                    coupon.maxDiscount
                );
            }
        }
    }

    const taxableAmount = itemTotal - discount;
    const gst = Math.round(taxableAmount * GST_RATE);

    const grandTotal =
        taxableAmount +
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