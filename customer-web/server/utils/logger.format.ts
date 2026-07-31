// logger.format.ts
import winston from 'winston';
import chalk from 'chalk';

export const devFormat = winston.format.printf((info) => {
    const { level, message, timestamp, meta } = info;

    const colors: any = {
        info: chalk.blue,
        error: chalk.red,
        warn: chalk.yellow,
        api: chalk.green,
    };

    const color = colors[level] || chalk.white;

    const metaStr = meta
        ? Object.entries(meta)
            .map(([k, v]) => `${k}:${v}`)
            .join(' | ')
        : '';

    return (
        color(`[${level.toUpperCase()}]`) +
        ` ${message} ` +
        chalk.gray(`(${timestamp})`) +
        (metaStr ? `\n   ${chalk.gray(metaStr)}` : '')
    );
});