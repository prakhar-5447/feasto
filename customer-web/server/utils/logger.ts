import winston from 'winston';
import { devFormat } from './logger.format';

const logger = winston.createLogger({
  level: process.env['LOG_LEVEL'] || 'info',

  levels: {
    error: 0,
    warn: 1,
    info: 2,
    debug: 3
  },

  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),

  transports: [
    new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
    new winston.transports.File({ filename: 'logs/combined.log' })
  ]
});

// ✅ Pretty console only in dev
if (process.env['NODE_ENV'] !== 'production') {
    logger.add(
        new winston.transports.Console({
            format: winston.format.combine(
                winston.format.timestamp(),
                devFormat
            )
        })
    );
}

export default logger;