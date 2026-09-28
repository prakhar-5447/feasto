import {
    Request,
    Response,
    NextFunction
} from "express";

import logger from "../utils/logger";

interface AppError extends Error {
    status?: number;
}

export const error = (
    err: AppError,
    req: Request,
    res: Response,
    next: NextFunction
): void => {
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