// This is imported by a lot of files, avoid importing other code
import winston from 'winston';
import { apiConfig, servicesConfig } from '@config';

const WinstonLevels = ['error', 'warn', 'info', 'http', 'verbose', 'debug', 'silly'];

enum LevelColors {
    error = '\x1b[31m',
    warn = '\x1b[35m',
    info = '\x1b[34m',
    http = '',
    verbose = '',
    debug = '\x1b[37m',
    silly = '\x1b[37m',
}

// Logger
const winstonLogger = winston.createLogger({
    level: WinstonLevels[apiConfig.logs.local],
});

// Formats

const localFormat = winston.format.printf((info) => {
    return LevelColors[info.level] + `[${info.category}] ${info.message} \x1b[0m`;
});

winstonLogger.add(
    new winston.transports.Console({
        format: localFormat,
    }),
);

class Logger {
    _prefix;

    constructor(prefix) {
        this._prefix = prefix.split(/[\\/]/).pop();
    }

    _buildMessage(message) {
        if (message instanceof Error) {
            message = 'Error: ' + message.message;
        }
        return {
            message: typeof message == 'string' ? message : JSON.stringify(message),
            category: this._prefix,
        };
    }

    // Logger methods

    error(message) {
        winstonLogger.error(this._buildMessage(message));
    }
    warn(message) {
        winstonLogger.warn(this._buildMessage(message));
    }
    info(message) {
        winstonLogger.info(this._buildMessage(message));
    }
    http(message) {
        winstonLogger.http(this._buildMessage(message));
    }
    verbose(message) {
        winstonLogger.verbose(this._buildMessage(message));
    }
    debug(message) {
        winstonLogger.debug(this._buildMessage(message));
    }
}

export default Logger;
