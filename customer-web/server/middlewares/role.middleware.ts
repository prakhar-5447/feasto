import { Request, Response, NextFunction } from "express";

interface AuthRequest extends Request {
    user?: any;
}

export const role = (...roles: string[]) => {
    return (
        req: AuthRequest,
        res: Response,
        next: NextFunction
    ): void => {
        if (!req.user) {
            res.status(401).json({
                message: "Unauthorized"
            });
            return;
        }

        if (!roles.includes(req.user.role)) {
            res.status(403).json({
                message: "Access denied"
            });
            return;
        }

        next();
    };
};