import type {
    SendOtpRequest,
    SendOtpResponse,
    VerifyOtpRequest,
    VerifyOtpResponse,
} from './auth.types';


class AuthService {

    async sendOtp(
        data: SendOtpRequest,
    ): Promise<SendOtpResponse> {

        const response = await fetch(
            '/api/v1/restaurant/phone-auth',
            {
                method: 'POST',

                headers: {
                    'Content-Type':
                        'application/json',
                },

                credentials: 'include',

                body: JSON.stringify(data),
            },
        );


        const result =
            await response.json() as SendOtpResponse;


        if (!response.ok) {

            throw new Error(
                result.message ||
                'Unable to send OTP.',
            );
        }


        return result;
    }


    async verifyOtp(
        data: VerifyOtpRequest,
    ): Promise<VerifyOtpResponse> {

        const response = await fetch(
            '/api/v1/restaurant/verify-otp',
            {
                method: 'POST',

                headers: {
                    'Content-Type':
                        'application/json',
                },

                credentials: 'include',

                body: JSON.stringify(data),
            },
        );


        const result =
            await response.json() as VerifyOtpResponse;


        if (!response.ok) {

            throw new Error(
                result.message ||
                'Unable to verify OTP.',
            );
        }


        return result;
    }
}


export const authService =
    new AuthService();