import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User, { IUser } from "../models/user.model";

export interface AuthRequest extends Request {
    user?: IUser;
}

export const protect = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const token = req.cookies["accessToken"];

        if (!token) {
            res.status(401).json({
                success: false,
                message: "Authentication required"
            });
            return;
        }

        const decoded = jwt.verify(
            token,
            process.env["ACCESS_TOKEN_SECRET"]!
        ) as { userId: string };

        const user = await User.findById(decoded.userId);

        if (!user) {
            res.status(401).json({
                success: false,
                message: "User not found"
            });
            return;
        }

        if (!user.isActive) {
            res.status(401).json({
                success: false,
                message: "User account is inactive"
            });
            return;
        }

        req.user = user;
        next();
    } catch {
        res.status(401).json({
            success: false,
            message: "Access token expired or invalid"
        });
    }
};