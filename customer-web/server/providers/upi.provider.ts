export const createUpiPayment =
    async (
        amount: number,
        orderId: string
    ) => {

        const transactionId =
            'QR' + Date.now();

        const upiId =
            process.env['UPI_ID'] ||
            'feasto@upi';


        const qrData =
            `upi://pay` +
            `?pa=${upiId}` +
            `&pn=Feasto` +
            `&tr=${transactionId}` +
            `&tn=Food Order ${orderId}` +
            `&am=${amount}` +
            `&cu=INR`;


        return {

            provider: 'UPI',

            transactionId,

            qrData

        };
    };


export const verifyUpiPayment =
    async (
        payload: any
    ) => {

        /*
          Real UPI verification/webhook
          logic will go here later.
        */

        return {

            success: true,

            transactionId:
                payload.transactionId

        };
    };