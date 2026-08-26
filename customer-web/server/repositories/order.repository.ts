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

export const findUserOrders = async (userId: string) => {
    return Order.find(
        { user: userId },
        {
            _id: 1,
            orderNumber: 1,
            restaurant: 1,
            status: 1,
            totalAmount: 1,
            itemCount: 1,
            createdAt: 1
        }
    )
        .populate({
            path: "restaurant",
            select: "name"
        })
        .sort({ createdAt: -1 })
        .lean();
};
