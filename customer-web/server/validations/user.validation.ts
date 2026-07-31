import { Request, Response, NextFunction } from "express";

export const updateProfileValidation = (req: Request, res: Response, next: NextFunction) => {
    const { name } = req.body;

    if (name && name.length < 2) {
        res.status(400).json({ message: 'Name too short' });
        return;
    }

    next();
};