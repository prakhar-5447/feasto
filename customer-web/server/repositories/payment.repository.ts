import Payment from "../models/payment.model";

export const createPayment = async (
    data: any
) => {
    return Payment.create(data);
};

export const findPaymentByOrder = async (
    orderId: string
) => {
    return Payment.findOne({
        order: orderId
    });
};

export const findPaymentById = async (
    paymentId: string
) => {
    return Payment.findById(paymentId);
};

export const updatePayment = async (
    paymentId: string,
    data: any
) => {
    return Payment.findByIdAndUpdate(
        paymentId,
        data,
        {
            new: true,
            runValidators: true
        }
    );
};