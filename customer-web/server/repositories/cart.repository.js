const Cart = require("../models/cart.model");

exports.getCartByUser = async (userId) => {

    return await Cart.findOne({ user: userId })
        .populate("items.food");

};

exports.createCart = async (data) => {

    return await Cart.create(data);

};

exports.updateCart = async (cartId, data) => {

    return await Cart.findByIdAndUpdate(cartId, data, { new: true });

};

exports.deleteCart = async (cartId) => {

    return await Cart.findByIdAndDelete(cartId);

};