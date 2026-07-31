const cartService = require("../services/cart.service");

exports.addToCart = async (req, res, next) => {

    try {

        const cart = await cartService.addToCart(
            req.user.id,
            req.body.foodId,
            req.body.quantity
        );

        res.json({
            success: true,
            data: cart
        });

    } catch (error) {

        next(error);

    }

};