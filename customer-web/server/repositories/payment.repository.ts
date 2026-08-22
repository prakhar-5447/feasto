import {
    Payment
} from '../models/payment.model';


// ======================================================
// CREATE
// ======================================================

export const createPayment =
    async (
        data: any
    ) => {

        return Payment.create(
            data
        );

    };


// ======================================================
// FIND BY ORDER
// ======================================================

export const findPaymentByOrder =
    async (
        orderId: string
    ) => {

        return Payment.findOne({

            order: orderId

        });

    };


// ======================================================
// FIND BY PAYMENT ID
// ======================================================

export const findPaymentById =
    async (
        paymentId: string
    ) => {

        return Payment.findById(
            paymentId
        );

    };


// ======================================================
// UPDATE
// ======================================================

export const updatePayment =
    async (
        paymentId: string,
        data: any
    ) => {

        return Payment.findByIdAndUpdate(

            paymentId,

            data,

            {
                new: true
            }

        );

    };