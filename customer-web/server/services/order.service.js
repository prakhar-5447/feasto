const cartRepository = require("../repositories/cart.repository");
const orderRepository = require("../repositories/order.repository");

exports.placeOrder = async (userId) => {

    const cart = await cartRepository.getCartByUser(userId);

    if (!cart || cart.items.length === 0) {

        throw new Error("Cart is empty");

    }

    const order = await orderRepository.createOrder({

        user: userId,
        restaurant: cart.restaurant,
        items: cart.items.map(item => ({
            food: item.food._id,
            quantity: item.quantity,
            price: item.food.price
        })),
        totalPrice: cart.totalPrice

    });

    await cartRepository.deleteCart(cart._id);

    return order;

};

exports.getUserOrders = async (userId) => {

    return await orderRepository.getOrdersByUser(userId);

};

exports.getRestaurantOrders = async (restaurantId) => {

    return await orderRepository.getRestaurantOrders(restaurantId);

};

exports.updateOrderStatus = async (orderId, status) => {

    return await orderRepository.updateOrderStatus(orderId, status);

};