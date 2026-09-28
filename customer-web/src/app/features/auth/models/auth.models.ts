type AuthStep =
    | 'phone'
    | 'otp'
    | 'details'


interface PhoneAuthResponse {
    success: boolean;
    message: string;
    data: any;
}

interface VerifyOtpResponse {
    success: boolean;
    message: string;
    data: any;
}

interface CompleteProfileResponse {
    success: boolean;
    message: string;
    data: any;
}
