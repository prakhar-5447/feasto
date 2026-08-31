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
    | "UPI"
    | "FAKEUPI"
    | "RAZORPAY"
    | "COD";

export const createPayment = async (
    orderId: string,
    method: PaymentMethod
) => {
    const order = await orderRepo.findById(orderId);

    if (!order) {
        throw new Error("Order not found");
    }

    if (order.paymentStatus === "SUCCESS") {
        throw new Error("Order already paid");
    }

    let providerResponse: any;

    switch (method) {
        case "UPI":
            providerResponse = await createUpiPayment(
                order.billing.grandTotal,
                order.orderId
            );
            break;

        case "RAZORPAY":
            providerResponse = await createRazorpayPayment(
                order.billing.grandTotal,
                order.orderId
            );
            break;

        case "COD":
            providerResponse = await createCodPayment(
                order.billing.grandTotal,
                order.orderId
            );
            break;

        case "FAKEUPI":
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

    if (method === "FAKEUPI") {
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

    if (payment.status === "SUCCESS") {
        return payment;
    }

    let verification: any;

    switch (method) {
        case "FAKEUPI":
            verification =
                await verifyFakeUpiPayment({
                    transactionId
                });
            break;

        case "UPI":
            verification =
                await verifyUpiPayment({
                    transactionId
                });
            break;

        case "RAZORPAY":
            verification =
                await verifyRazorpayPayment({
                    paymentId: transactionId
                });
            break;

        case "COD":
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
                status: "FAILED"
            }
        );

        await orderRepo.update(
            payment.order.toString(),
            {
                paymentStatus: "FAILED"
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
                status: "SUCCESS",
                paidAt: new Date()
            }
        );

    const orderId =
        payment.order.toString();

    await orderRepo.update(
        orderId,
        {
            paymentStatus: "SUCCESS",
            orderStatus: "PLACED",

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