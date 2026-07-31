import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/token.utils";

interface AuthRequest extends Request {
    user?: any;
}

export const protect = (
    req: AuthRequest,
    res: Response,
    next: NextFunction
): void => {
    try {
        const token = req.cookies["token"];

        if (!token) {
            res.status(401).json({ message: "Unauthorized" });
            return;
        }

        const decoded = verifyToken(token);

        req.user = decoded;

        next();
    } catch (err) {
        res.status(401).json({ message: "Invalid token" });
    }
};