import * as orderRepo from "../repositories/order.repository";
import * as restaurantService from "./restaurant.service";
import * as cartService from "./cart.service";

export const createOrder = async (
    userId: string,
    address: any
) => {

    const cart =
        await cartService
            .getCart(userId);

    if (
        !cart ||
        cart.items.length === 0
    ) {
        throw new Error(
            "Cart is empty"
        );
    }

    const restaurantId =
        cart.items[0].food.restaurant;

    const restaurant =
        await restaurantService.getRestaurantById(
            restaurantId
        );

    if (!restaurant) {
        throw new Error(
            "Restaurant not found"
        );
    }

    const itemTotal =
        cart.items.reduce(
            (sum: number, item: any) =>
                sum +
                item.food.price *
                item.quantity,
            0
        );

    const deliveryFee = 40;
    const platformFee = 5;
    const gst =
        itemTotal * 0.05;

    const grandTotal =
        itemTotal +
        deliveryFee +
        platformFee +
        gst;

    return orderRepo.create({

        orderId:
            "FEA" +
            Date.now(),

        customer: userId,

        restaurant,

        restaurantSnapshot: {
            name:
                restaurant.name,
            address:
                restaurant.address
        },

        items:
            cart.items.map(
                (item: any) => ({
                    food:
                        item.food._id,

                    name:
                        item.food.name,

                    image:
                        item.food.image,

                    price:
                        item.food.price,

                    quantity:
                        item.quantity,

                    total:
                        item.food.price *
                        item.quantity
                })
            ),

        billing: {
            itemTotal,
            discount: 0,
            deliveryFee,
            platformFee,
            gst,
            grandTotal
        },

        deliveryAddress:
            address,

        payment: {
            method: "UPI",
        },
        paymentStatus: "pending",

        orderStatus:
            "pending_payment"
    });
}

export const markPaid = async (
    orderId: string
) => {

    return orderRepo.update(
        orderId,
        {
            "payment.status":
                "success",

            orderStatus:
                "placed"
        }
    );
}

export const getOrder = async (
    orderId: string
) => {
    return orderRepo.findById(
        orderId
    );
}

export const getUserOrders = async (
    userId: string
) => {
    return orderRepo.findUserOrders(
        userId
    );
}
