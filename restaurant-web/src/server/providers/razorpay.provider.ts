export const createRazorpayPayment = async (
    amount: number,
    orderId: string
) => {
    /*
      Razorpay SDK code goes here.

      Example:
      const razorpayOrder = await razorpay.orders.create({
          amount: amount * 100,
          currency: "INR",
          receipt: orderId
      });
    */

    return {
        provider: "RAZORPAY",
        transactionId: null,
        amount,
        orderId
    };
};

export const verifyRazorpayPayment = async (
    payload: any
) => {
    /*
      Razorpay signature verification goes here.
    */

    return {
        success: true,
        transactionId: payload.paymentId
    };
};