export interface PaymentProvider {
    createPayment(
        amount: number,
        orderId: string
    ): Promise<any>;

    verifyPayment(
        payload: any
    ): Promise<any>;
}