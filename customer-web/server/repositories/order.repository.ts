import Order from "../models/order.model";

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