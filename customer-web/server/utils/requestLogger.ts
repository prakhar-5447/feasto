import { Request, Response, NextFunction } from 'express';
import logger from './logger';

export const requestLogger = (type: 'API' | 'SSR') => {
  return (req: Request, res: Response, next: NextFunction) => {
    const start = Date.now();

    res.on('finish', () => {
      const duration = Date.now() - start;

      // 🔥 detect client log payload
      const isClientLog = req.headers['x-client-log'] === 'true';
      const method = isClientLog ? req.body?.method || 'GET' : req.method;
      const path = isClientLog ? req.body?.path : req.originalUrl;
      const logType = isClientLog ? 'CLIENT' : type;
      logger.info(`${method} ${path}`, {
        meta: {
          requestId: req.requestId,
          type: logType,
          status: res.statusCode,
          duration: `${isClientLog ? req.body?.duration || 0 : duration}ms`,
          ip: req.ip,
          ua: (isClientLog ? req.body?.ua : req.headers['user-agent'])?.split(' ')[0],
          ref: isClientLog ? req.body?.ref : req.headers['referer']
        }
      });
    });

    next();
  };
};