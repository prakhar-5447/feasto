import Cart from "../models/cart.model";

export const findCartByUser = async (
    userId: string
) => {

    return Cart.findOne({
        user: userId
    })
        .populate(
            "items.food"
        )
        .populate(
            "restaurant"
        );
};

export const createCart = (data: any) => {
    return Cart.create(data);
};

export const saveCart = (cart: any) => {
    return cart.save();
};

export const deleteCart = (userId: string) => {
    return Cart.findOneAndDelete({
        user: userId
    });
};