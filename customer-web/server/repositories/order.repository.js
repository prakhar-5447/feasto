const Order = require("../models/order.model");

exports.createOrder = async (data) => {

    return await Order.create(data);

};

exports.getOrdersByUser = async (userId) => {

    return await Order.find({ user: userId })
        .populate("items.food")
        .populate("restaurant");

};

exports.getRestaurantOrders = async (restaurantId) => {

    return await Order.find({ restaurant: restaurantId })
        .populate("items.food")
        .populate("user");

};

exports.updateOrderStatus = async (orderId, status) => {

    return await Order.findByIdAndUpdate(
        orderId,
        { status },
        { new: true }
    );

};