interface OtpRecord {
    otp: string;
    expiresAt: number;
}

const otpStore = new Map<
    string,
    OtpRecord
>();

export function generateOtp(): string {
    return Math.floor(
        100000 + Math.random() * 900000
    ).toString();
}

export function saveOtp(
    phone: string,
    otp: string
): void {
    otpStore.set(phone, {
        otp,
        expiresAt:
            Date.now() + 5 * 60 * 1000,
    });
}

export function getOtp(
    phone: string
): OtpRecord | undefined {
    return otpStore.get(phone);
}

export function deleteOtp(
    phone: string
): void {
    otpStore.delete(phone);
}