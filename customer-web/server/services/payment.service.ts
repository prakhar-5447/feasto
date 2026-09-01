import * as paymentRepo from "../repositories/payment.repository";
import * as orderRepo from "../repositories/order.repository";

import {
    createUpiPayment,
    verifyUpiPayment
} from "../providers/upi.provider";

import {
    createFakeUpiPayment,
    verifyFakeUpiPayment
} from "../providers/fake-upi.provider";

import {
    createRazorpayPayment,
    verifyRazorpayPayment
} from "../providers/razorpay.provider";

import {
    createCodPayment,
    verifyCodPayment
} from "../providers/cod.provider";

type PaymentMethod =
    | "upi"
    | "fakeupi"
    | "razorpay"
    | "cod";

export const createPayment = async (
    orderId: string,
    method: PaymentMethod
) => {
    const order = await orderRepo.findById(orderId);

    if (!order) {
        throw new Error("Order not found");
    }

    if (order.paymentStatus === "success") {
        throw new Error("Order already paid");
    }

    let providerResponse: any;

    switch (method) {
        case "upi":
            providerResponse = await createUpiPayment(
                order.billing.grandTotal,
                order.orderId
            );
            break;

        case "razorpay":
            providerResponse = await createRazorpayPayment(
                order.billing.grandTotal,
                order.orderId
            );
            break;

        case "cod":
            providerResponse = await createCodPayment(
                order.billing.grandTotal,
                order.orderId
            );
            break;

        case "fakeupi":
            providerResponse = await createFakeUpiPayment(
                order.billing.grandTotal,
                order.orderId,
                `TXN${Date.now()}`
            );
            break;

        default:
            throw new Error("Invalid payment method");
    }

    const payment = await paymentRepo.createPayment({
        order: order._id,
        amount: order.billing.grandTotal,
        method,
        provider: providerResponse.provider,
        transactionId: providerResponse.transactionId
    });

    if (method === "fakeupi") {
        providerResponse.qrData =
            `http://localhost:4200/fake-payment` +
            `?paymentId=${payment._id}`;
    }

    return {
        payment,
        providerResponse
    };
};

export const verifyPayment = async (
    paymentId: string,
    method: PaymentMethod,
    transactionId: string
) => {
    const payment =
        await paymentRepo.findPaymentById(paymentId);

    if (!payment) {
        throw new Error("Payment not found");
    }

    if (payment.status === "success") {
        return payment;
    }

    let verification: any;

    switch (method) {
        case "fakeupi":
            verification =
                await verifyFakeUpiPayment({
                    transactionId
                });
            break;

        case "upi":
            verification =
                await verifyUpiPayment({
                    transactionId
                });
            break;

        case "razorpay":
            verification =
                await verifyRazorpayPayment({
                    paymentId: transactionId
                });
            break;

        case "cod":
            verification =
                await verifyCodPayment();
            break;

        default:
            throw new Error("Invalid payment method");
    }

    if (!verification.success) {
        await paymentRepo.updatePayment(
            payment._id.toString(),
            {
                status: "failed"
            }
        );

        await orderRepo.update(
            payment.order.toString(),
            {
                paymentStatus: "failed"
            }
        );

        throw new Error(
            "Payment verification failed"
        );
    }

    const updatedPayment =
        await paymentRepo.updatePayment(
            payment._id.toString(),
            {
                method,
                transactionId,
                status: "success",
                paidAt: new Date()
            }
        );

    const orderId =
        payment.order.toString();

    await orderRepo.update(
        orderId,
        {
            paymentStatus: "success",
            orderStatus: "placed",

            "payment.method": method,
            "payment.transactionId": transactionId,
            "payment.paidAt": new Date()
        }
    );

    return {
        updatedPayment,
        orderId
    };
};

export const getPaymentByOrder = async (
    orderId: string
) => {
    const payment =
        await paymentRepo.findPaymentByOrder(
            orderId
        );

    if (!payment) {
        throw new Error("Payment not found");
    }

    return payment;
};