import jwt from "jsonwebtoken";

interface TokenPayload {
    userId: string;
}

export const generateToken = (user: any): string => {
    return jwt.sign(
        {
            userId: user._id.toString()
        },
        process.env["ACCESS_TOKEN_SECRET"]!,
        {
            expiresIn: "15m"
        }
    );
};

export const generateRefreshToken = (user: any): string => {
    return jwt.sign(
        {
            userId: user._id.toString()
        },
        process.env["REFRESH_TOKEN_SECRET"]!,
        {
            expiresIn: "7d"
        }
    );
};

export const verifyRefreshToken = (
    token: string
): TokenPayload => {
    return jwt.verify(
        token,
        process.env["REFRESH_TOKEN_SECRET"]!
    ) as TokenPayload;
};