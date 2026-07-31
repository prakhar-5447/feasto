const cartRepository = require("../repositories/cart.repository");
const Food = require("../models/food.model");

exports.addToCart = async (userId, foodId, quantity) => {

    const food = await Food.findById(foodId).populate("restaurant");

    let cart = await cartRepository.getCartByUser(userId);

    if (!cart) {

        cart = await cartRepository.createCart({
            user: userId,
            restaurant: food.restaurant._id,
            items: [],
            totalPrice: 0
        });

    }

    if (cart.restaurant.toString() !== food.restaurant._id.toString()) {

        throw new Error("Cart can only contain food from one restaurant");

    }

    const existingItem = cart.items.find(
        item => item.food.toString() === foodId
    );

    if (existingItem) {

        existingItem.quantity += quantity;

    } else {

        cart.items.push({
            food: foodId,
            quantity
        });

    }

    cart.totalPrice += food.price * quantity;

    await cart.save();

    return cart;

};