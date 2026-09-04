export interface Coupon {
    _id: string;
    code: string;
    description: string;
    minOrder: number;
}

export interface CouponsResponse {
    success: boolean;
    data: Coupon[];
}