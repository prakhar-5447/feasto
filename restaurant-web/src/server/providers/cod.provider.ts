export const createCodPayment = async (
  amount: number,
  orderId: string
) => {
  return {
    provider: "COD",
    transactionId: null,
    amount,
    orderId
  };
};

export const verifyCodPayment = async () => {
  return {
    success: true
  };
};