import { Request, Response, NextFunction } from 'express';
import { randomUUID } from 'crypto';

export const requestIdMiddleware = (req: Request, res: Response, next: NextFunction) => {

  const incomingId = req.headers['x-request-id'] as string;
  
  const requestId = incomingId || randomUUID();
  
  req.requestId = requestId;
  
  // expose to client (debugging / tracing)
  res.setHeader('x-request-id', requestId);
  next();
};