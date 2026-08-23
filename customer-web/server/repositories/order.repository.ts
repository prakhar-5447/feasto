import Order from "../models/order.model";

export const create = async (data: any) => {
    return Order.create(data);
}

export const findById = async (id: string) => {
    return Order.findById(id);
}

export const update = async (
    id: string,
    data: any
) => {
    return Order.findByIdAndUpdate(
        id,
        data,
        { new: true }
    );
}

export const findUserOrders = async (
    userId: string
) => {
    return Order.find({
        customer: userId
    }).sort({
        createdAt: -1
    });
}
