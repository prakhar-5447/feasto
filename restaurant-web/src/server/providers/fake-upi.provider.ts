export const createFakeUpiPayment = async (
    amount: number,
    orderId: string,
    transactionId: string
) => {
    return {
        provider: "FAKEUPI",
        transactionId,
        amount,
        orderId
    };
};

export const verifyFakeUpiPayment = async ({
    transactionId
}: {
    transactionId: string;
}) => {
    if (!transactionId) {
        return {
            success: false
        };
    }

    return {
        success: true,
        transactionId
    };
};