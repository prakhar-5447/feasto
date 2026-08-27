import { Request, Response, NextFunction } from "express";

const phoneValidation = (
    req: Request,
    res: Response,
    next: NextFunction
): void => {
    const { phone } = req.body;

    if (!phone || !/^\d{10}$/.test(phone)) {
        res.status(400).json({
            success: false,
            message: "Invalid phone number"
        });
        return;
    }

    next();
};

export default phoneValidation;