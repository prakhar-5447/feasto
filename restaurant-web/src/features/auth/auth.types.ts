export interface SendOtpRequest {
    phone: string;
}

export interface SendOtpResponse {
    success: boolean;
    message?: string;
    data?: {
        otp?: string;
    };
}

export interface VerifyOtpRequest {
    phone: string;
    otp: string;
}

export interface LoginUser {
    id: string;
    phone: string;
    name?: string;
    role: 'restaurant_partner';
}

export interface VerifyOtpResponse {
    success: boolean;
    message?: string;
    data?: {
        user: LoginUser;
        isNewUser?: boolean;
    };
}