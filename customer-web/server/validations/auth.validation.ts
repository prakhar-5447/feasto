import { Request, Response, NextFunction } from "express";

const phoneValidation = (req: Request, res: Response, next: NextFunction) => {
    const { phone } = req.body;

    if (!phone || phone.length !== 10) {
        res.status(400).json({ message: 'Invalid phone' });
        return;
    }

    next();
};

export default phoneValidation;