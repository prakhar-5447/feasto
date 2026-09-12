export interface LoginRequest {
    partnerId: string;
    password: string;
}

export interface LoginResponse {
    success: boolean;
    message: string;
}