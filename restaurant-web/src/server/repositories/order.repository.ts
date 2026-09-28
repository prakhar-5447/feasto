import Order from "../models/order.model";

import {
    IOrder,
    OrderStatus,
} from "@/server/models/order.model";
import mongoose from "mongoose";

export const create = async (
    data: any
) => {
    return Order.create(data);
};

export const findById = async (
    id: string
) => {
    return Order.findById(id);
};

export const update = async (
    id: string,
    data: any
) => {
    return Order.findByIdAndUpdate(
        id,
        data,
        {
            new: true,
            runValidators: true
        }
    );
};

export const findUserOrders = async (
    userId: string
) => {
    return Order.find(
        {
            customer: userId
        },
        {
            _id: 1,
            orderId: 1,
            restaurant: 1,
            orderStatus: 1,
            billing: 1,
            items: 1,
            createdAt: 1
        }
    )
        .populate({
            path: "restaurant",
            select: "name"
        })
        .sort({
            createdAt: -1
        })
        .lean();
};

export const findRestaurantOrders = async (
    restaurantId: mongoose.Types.ObjectId,
    options?: {
        status?: OrderStatus;
        search?: string;
    }
) => {
    const query: Record<string, unknown> = {
        restaurant: restaurantId,
    };

    if (options?.status) {
        query.orderStatus = options.status;
    }

    const orders = await Order.find(query)
        .populate("customer", "name phone")
        .populate("driver", "name phone")
        .sort({ createdAt: -1 })
        .lean();

    if (!options?.search) {
        return orders;
    }

    const search = options.search.toLowerCase();

    return orders.filter((order: any) => {
        const customerName =
            order.customer?.name?.toLowerCase() ?? "";

        const customerPhone =
            order.customer?.phone?.toLowerCase() ?? "";

        const orderId =
            order.orderId?.toLowerCase() ?? "";

        return (
            customerName.includes(search) ||
            customerPhone.includes(search) ||
            orderId.includes(search)
        );
    });
}

export const findRestaurantOrder = async (
    orderId: string,
    restaurantId: mongoose.Types.ObjectId
) => {
    return Order.findOne({
        orderId,
        restaurant: restaurantId,
    })
        .populate("customer", "name phone")
        .populate("driver", "name phone")
        .exec();
}

export const updateOrder = async (
    orderId: string,
    restaurantId: mongoose.Types.ObjectId,
    update: Partial<IOrder>
) => {
    return Order.findOneAndUpdate(
        {
            orderId,
            restaurant: restaurantId,
        },
        {
            $set: update,
        },
        {
            new: true,
        }
    )
        .populate("customer", "name phone")
        .populate("driver", "name phone")
        .exec();
}