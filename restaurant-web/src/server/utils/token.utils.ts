import jwt from 'jsonwebtoken';

interface TokenPayload {
    userId: string;
}

export const generateToken = (
    user: { _id: { toString(): string } },
): string => {
    const secret =
        process.env.ACCESS_TOKEN_SECRET;

    if (!secret) {
        throw new Error(
            'ACCESS_TOKEN_SECRET is not defined',
        );
    }

    return jwt.sign(
        {
            userId: user._id.toString(),
        },
        secret,
        {
            expiresIn: '15m',
        },
    );
};

export const generateRefreshToken = (
    user: { _id: { toString(): string } },
): string => {
    const secret =
        process.env.REFRESH_TOKEN_SECRET;

    if (!secret) {
        throw new Error(
            'REFRESH_TOKEN_SECRET is not defined',
        );
    }

    return jwt.sign(
        {
            userId: user._id.toString(),
        },
        secret,
        {
            expiresIn: '7d',
        },
    );
};

export const verifyRefreshToken = (
    token: string,
): TokenPayload => {
    const secret =
        process.env.REFRESH_TOKEN_SECRET;

    if (!secret) {
        throw new Error(
            'REFRESH_TOKEN_SECRET is not defined',
        );
    }

    return jwt.verify(
        token,
        secret,
    ) as TokenPayload;
};