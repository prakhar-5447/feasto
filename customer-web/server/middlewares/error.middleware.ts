import logger from "../utils/logger";
import { Request, Response, NextFunction } from "express";

export const error = (err: any, req: Request, res: Response, next: NextFunction) => {

    logger.error({
        message: err.message,
        stack: err.stack,
        url: req.originalUrl,
        method: req.method
    });

    res.status(err.status || 500).json({
        success: false,
        message: err.message || "Server Error"
    });

};