import { Request, Response, NextFunction } from "express";
import * as userService from "../services/user.service";

interface AuthRequest extends Request {
    user?: {
        id: string;
    };
}

export const getProfile = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const user = await userService.getProfile(req.user!.id);
        res.json({ success: true, data: user });
    } catch (err) {
        next(err);
    }
};

export const updateProfile = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const user = await userService.updateProfile(req.user!.id, req.body);
        res.json({ success: true, data: user });
    } catch (err) {
        next(err);
    }
};

export const deleteProfile = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        await userService.deleteProfile(req.user!.id);

        res.clearCookie("token");

        res.json({ success: true });
    } catch (err) {
        next(err);
    }
};