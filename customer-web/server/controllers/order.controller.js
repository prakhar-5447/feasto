const orderService = require("../services/order.service");

exports.placeOrder = async (req, res, next) => {

    try {

        const order = await orderService.placeOrder(
            req.user.id
        );

        res.status(201).json({
            success: true,
            data: order
        });

    } catch (error) {

        next(error);

    }

};

exports.getUserOrders = async (req, res, next) => {

    try {

        const orders = await orderService.getUserOrders(
            req.user.id
        );

        res.json({
            success: true,
            data: orders
        });

    } catch (error) {

        next(error);

    }

};

exports.getRestaurantOrders = async (req, res, next) => {

    try {

        const orders = await orderService.getRestaurantOrders(
            req.params["restaurantId"]
        );

        res.json({
            success: true,
            data: orders
        });

    } catch (error) {

        next(error);

    }

};

exports.updateOrderStatus = async (req, res, next) => {

    try {

        const order = await orderService.updateOrderStatus(
            req.params["id"],
            req.body.status
        );

        res.json({
            success: true,
            data: order
        });

    } catch (error) {

        next(error);

    }

};